import { Resend } from 'resend';
import type { Volunteer } from '@prisma/client';
import { prisma } from '@/utils/prisma';
import { getRoOptionLabels } from '@/utils/volunteers/server';

const SITE_URL = process.env.SITE_URL ?? 'https://centrulsfantulioancelmilostiv.org';
const FROM = 'Bucurie in Dar <office@bucurieindar.ro>';

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function row(label: string, value: string | null | undefined): string {
    if (!value) return '';
    return `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td>` +
        `<td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;
}

// Emails everyone in the NotificationEmail table (managed in the admin panel).
// Never throws: a failed email must not lose a sign-up that is already saved.
export async function notifyNewVolunteer(v: Volunteer): Promise<void> {
    try {
        const recipients = (await prisma.notificationEmail.findMany({ select: { email: true } })).map((r) => r.email);
        if (recipients.length === 0) return;
        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY missing, volunteer notification not sent');
            return;
        }

        const labels = getRoOptionLabels();
        const list = (keys: string[], map: Record<string, string>) => keys.map((k) => map[k] ?? k).join(', ');
        const fullName = `${v.firstName} ${v.lastName}`;
        const adminLink = `${SITE_URL}/admin?v=${v.id}`;

        const html = `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#222">
  <p>S-a înscris un voluntar nou pe site:</p>
  <table style="border-collapse:collapse">
    ${row('Nume', fullName)}
    ${row('Email', v.email)}
    ${row('Telefon', v.phone)}
    ${row('Localitate', v.city)}
    ${row('Arii', list(v.areas, labels.AREAS))}
    ${row('Competențe', list(v.skills, labels.SKILLS))}
    ${row('Ore / săptămână', String(v.hoursPerWeek))}
    ${row('Disponibilitate', labels.AVAILABILITY_TYPES[v.availabilityType])}
    ${row('Durată asumată', labels.COMMITMENTS[v.commitment])}
  </table>
  <p><a href="${escapeHtml(adminLink)}">Vezi toate detaliile în panoul de administrare</a></p>
  <p style="color:#888;font-size:12px">Poți răspunde direct la acest email pentru a-i scrie voluntarului.</p>
</div>`;

        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: FROM,
            to: recipients,
            replyTo: v.email,
            subject: `Voluntar nou: ${fullName}`,
            html,
        });
        if (error) console.error('Volunteer notification failed', error);
    } catch (err) {
        console.error('Volunteer notification failed', err);
    }
}
