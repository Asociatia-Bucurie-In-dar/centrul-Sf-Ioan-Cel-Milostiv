// Creates an admin account, or resets its password if it already exists.
// Useful for the first account and for recovery if everyone is locked out.
//
// Usage (needs the database env vars, e.g. from `vercel env pull .env.local`):
//   ADMIN_USER_PASSWORD='the password' node --env-file=.env.local scripts/admin-user.mjs office@example.org ["Optional Name"]
//
// The password is read from an env var rather than an argument so it doesn't end up in `ps` output.
// Hash format must match utils/admin-auth.ts.

import { randomBytes, scrypt as scryptCb } from 'crypto';
import { promisify } from 'util';
import { PrismaClient } from '@prisma/client';

const scrypt = promisify(scryptCb);
const MIN_PASSWORD_LENGTH = 10;

const email = (process.argv[2] ?? '').trim().toLowerCase();
const name = process.argv[3]?.trim() || null;
const password = process.env.ADMIN_USER_PASSWORD ?? '';

if (!email || !email.includes('@')) {
    console.error('Usage: ADMIN_USER_PASSWORD=... node scripts/admin-user.mjs <email> [name]');
    process.exit(1);
}
if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(`ADMIN_USER_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    process.exit(1);
}

const salt = randomBytes(16);
const hash = await scrypt(password, salt, 64);
const passwordHash = `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;

const prisma = new PrismaClient();
try {
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
        await prisma.adminUser.update({ where: { email }, data: { passwordHash, ...(name ? { name } : {}) } });
        await prisma.adminSession.deleteMany({ where: { userId: existing.id } });
        console.log(`Password reset for ${email} (existing sessions logged out).`);
    } else {
        await prisma.adminUser.create({ data: { email, name, passwordHash } });
        console.log(`Admin account created: ${email}`);
    }
} finally {
    await prisma.$disconnect();
}
