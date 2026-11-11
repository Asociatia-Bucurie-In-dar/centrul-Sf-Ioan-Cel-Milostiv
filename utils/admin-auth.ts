import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/utils/prisma';

// Admin accounts: email + password, managed in the admin panel ("Conturi" tab).
//
// The very first account is created from environment variables: while the AdminUser table is
// empty, signing in with ADMIN_INITIAL_EMAIL / ADMIN_INITIAL_PASSWORD creates that account.
// Once any account exists those variables are ignored and can be removed.
//
// Sessions live in the AdminSession table; the cookie holds a random token and only its
// SHA-256 hash is stored, so a database leak does not leak usable sessions.

export const ADMIN_COOKIE = 'admin_session';
const SESSION_DAYS = 7;
export const MIN_PASSWORD_LENGTH = 10;

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;
const KEY_LENGTH = 64;

export type AdminUserInfo = { id: number; email: string; name: string | null };

// ---------- Passwords ----------

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16);
    const hash = await scrypt(password, salt, KEY_LENGTH);
    return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    const [scheme, saltB64, hashB64] = stored.split('$');
    if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false;
    const expected = Buffer.from(hashB64, 'base64');
    const actual = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// Used when the email is unknown, so failed logins take the same time either way.
const DUMMY_HASH = `scrypt$${Buffer.alloc(16).toString('base64')}$${Buffer.alloc(KEY_LENGTH).toString('base64')}`;

function sha256(value: string): string {
    return createHash('sha256').update(value).digest('hex');
}

function sameString(a: string, b: string): boolean {
    return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}

export function normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

// ---------- Login / sessions ----------

// Returns the user on success, null on bad credentials.
export async function authenticate(emailInput: string, password: string): Promise<AdminUserInfo | null> {
    const email = normalizeEmail(emailInput);
    if (!email || !password) return null;

    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (user) {
        return (await verifyPassword(password, user.passwordHash))
            ? { id: user.id, email: user.email, name: user.name }
            : null;
    }

    await verifyPassword(password, DUMMY_HASH);

    // Bootstrap: first account from env vars, only while there are no accounts at all.
    const initialEmail = process.env.ADMIN_INITIAL_EMAIL;
    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
    if (
        initialEmail &&
        initialPassword &&
        email === normalizeEmail(initialEmail) &&
        sameString(password, initialPassword) &&
        (await prisma.adminUser.count()) === 0
    ) {
        const created = await prisma.adminUser.create({
            data: { email, passwordHash: await hashPassword(password) },
        });
        return { id: created.id, email: created.email, name: created.name };
    }

    return null;
}

// Must be called from a server action or route handler (it sets a cookie).
export async function startSession(userId: number): Promise<void> {
    const token = randomBytes(32).toString('base64url');
    const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

    await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } });
    await prisma.adminSession.create({ data: { tokenHash: sha256(token), userId, expiresAt } });
    await prisma.adminUser.update({ where: { id: userId }, data: { lastLoginAt: new Date() } });

    (await cookies()).set(ADMIN_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt,
    });
}

export async function endSession(): Promise<void> {
    const jar = await cookies();
    const token = jar.get(ADMIN_COOKIE)?.value;
    if (token) {
        await prisma.adminSession.deleteMany({ where: { tokenHash: sha256(token) } });
    }
    jar.delete(ADMIN_COOKIE);
}

// Logs a user out everywhere except the current browser (after a password change).
export async function revokeOtherSessions(userId: number): Promise<void> {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    await prisma.adminSession.deleteMany({
        where: { userId, ...(token ? { tokenHash: { not: sha256(token) } } : {}) },
    });
}

// Cached per request, so pages and actions can call it freely.
export const getCurrentAdmin = cache(async (): Promise<AdminUserInfo | null> => {
    const token = (await cookies()).get(ADMIN_COOKIE)?.value;
    if (!token) return null;
    const session = await prisma.adminSession.findUnique({
        where: { tokenHash: sha256(token) },
        include: { user: { select: { id: true, email: true, name: true } } },
    });
    if (!session || session.expiresAt.getTime() < Date.now()) return null;
    return session.user;
});

// For pages and server actions: bounces to the login page when not signed in.
export async function requireAdmin(): Promise<AdminUserInfo> {
    const user = await getCurrentAdmin();
    if (!user) redirect('/admin/login');
    return user;
}
