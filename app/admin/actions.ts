'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/utils/prisma';
import {
    authenticate,
    endSession,
    hashPassword,
    MIN_PASSWORD_LENGTH,
    normalizeEmail,
    requireAdmin,
    revokeOtherSessions,
    startSession,
    verifyPassword,
} from '@/utils/admin-auth';
import { VOLUNTEER_AREAS, VOLUNTEER_STATUSES } from '@/content/volunteer/volunteer-options';

export type ActionResult = { ok: true } | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NOTES = 5000;
const MAX_NEED_HOURS = 1000;

function fail(error: string): ActionResult {
    return { ok: false, error };
}

// ---------- Auth ----------

export type LoginState = { error: string; email: string } | null;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    const user = await authenticate(email, password);
    if (!user) {
        // Small delay to slow down password guessing.
        await new Promise((resolve) => setTimeout(resolve, 800));
        // Echo the email back: React resets the form after an action.
        return { error: 'Email sau parolă greșită.', email };
    }

    await startSession(user.id);
    redirect('/admin');
}

export async function logout(): Promise<void> {
    await endSession();
    redirect('/admin/login');
}

// ---------- Volunteers ----------

export async function updateVolunteer(id: number, status: string, adminNotes: string): Promise<ActionResult> {
    await requireAdmin();
    if (!(VOLUNTEER_STATUSES as readonly string[]).includes(status)) return fail('Status invalid.');
    if (adminNotes.length > MAX_NOTES) return fail('Notițele sunt prea lungi.');

    await prisma.volunteer.update({
        where: { id },
        data: { status, adminNotes: adminNotes.trim() || null },
    });
    revalidatePath('/admin');
    return { ok: true };
}

// GDPR right to erasure: removes the record completely.
export async function deleteVolunteer(id: number): Promise<ActionResult> {
    await requireAdmin();
    await prisma.volunteer.delete({ where: { id } });
    revalidatePath('/admin');
    return { ok: true };
}

export async function saveAreaNeeds(needs: Record<string, number>): Promise<ActionResult> {
    await requireAdmin();
    const ops = [];
    for (const area of VOLUNTEER_AREAS) {
        const hours = Number(needs[area] ?? 0);
        if (!Number.isInteger(hours) || hours < 0 || hours > MAX_NEED_HOURS) {
            return fail(`Valoare invalidă pentru ${area}.`);
        }
        ops.push(prisma.volunteerAreaNeed.upsert({
            where: { area },
            create: { area, hoursPerWeek: hours },
            update: { hoursPerWeek: hours },
        }));
    }
    await prisma.$transaction(ops);
    revalidatePath('/admin');
    return { ok: true };
}

// ---------- Notification recipients ----------

export async function addNotificationEmail(emailInput: string): Promise<ActionResult> {
    await requireAdmin();
    const email = normalizeEmail(emailInput);
    if (!EMAIL_REGEX.test(email)) return fail('Adresa de email nu este validă.');

    await prisma.notificationEmail.upsert({ where: { email }, create: { email }, update: {} });
    revalidatePath('/admin');
    return { ok: true };
}

export async function removeNotificationEmail(id: number): Promise<ActionResult> {
    await requireAdmin();
    await prisma.notificationEmail.deleteMany({ where: { id } });
    revalidatePath('/admin');
    return { ok: true };
}

// ---------- Admin accounts ----------

export async function createAdminUser(emailInput: string, nameInput: string, password: string): Promise<ActionResult> {
    await requireAdmin();
    const email = normalizeEmail(emailInput);
    const name = nameInput.trim() || null;
    if (!EMAIL_REGEX.test(email)) return fail('Adresa de email nu este validă.');
    if (password.length < MIN_PASSWORD_LENGTH) return fail(`Parola trebuie să aibă cel puțin ${MIN_PASSWORD_LENGTH} caractere.`);
    if (await prisma.adminUser.findUnique({ where: { email } })) return fail('Există deja un cont cu acest email.');

    await prisma.adminUser.create({ data: { email, name, passwordHash: await hashPassword(password) } });
    revalidatePath('/admin');
    return { ok: true };
}

export async function deleteAdminUser(id: number): Promise<ActionResult> {
    const me = await requireAdmin();
    if (id === me.id) return fail('Nu îți poți șterge propriul cont.');
    await prisma.adminUser.deleteMany({ where: { id } });
    revalidatePath('/admin');
    return { ok: true };
}

export async function changeOwnPassword(currentPassword: string, newPassword: string): Promise<ActionResult> {
    const me = await requireAdmin();
    if (newPassword.length < MIN_PASSWORD_LENGTH) return fail(`Parola nouă trebuie să aibă cel puțin ${MIN_PASSWORD_LENGTH} caractere.`);

    const user = await prisma.adminUser.findUnique({ where: { id: me.id } });
    if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) return fail('Parola curentă este greșită.');

    await prisma.adminUser.update({ where: { id: me.id }, data: { passwordHash: await hashPassword(newPassword) } });
    await revokeOtherSessions(me.id);
    return { ok: true };
}
