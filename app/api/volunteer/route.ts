import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';
import { validateVolunteer } from '@/utils/volunteers/validation';
import { notifyNewVolunteer } from '@/utils/volunteers/notify';
import { VOLUNTEER_CONSENT_VERSION } from '@/content/volunteer/volunteer-options';
import { locales } from '@/i18n/routing';

const MAX_BODY_BYTES = 20_000;

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        const text = await req.text();
        if (text.length > MAX_BODY_BYTES) {
            return NextResponse.json({ error: 'TOO_LARGE' }, { status: 413 });
        }
        body = JSON.parse(text);
        if (!body || typeof body !== 'object') throw new Error('not an object');
    } catch {
        return NextResponse.json({ error: 'BAD_REQUEST' }, { status: 400 });
    }

    // Honeypot: the "website" field is hidden from people, bots tend to fill it.
    // Pretend success so they don't retry.
    if (typeof body.website === 'string' && body.website.length > 0) {
        return NextResponse.json({ ok: true });
    }

    const result = validateVolunteer(body);
    if (!result.ok) {
        return NextResponse.json({ error: 'VALIDATION', errors: result.errors }, { status: 400 });
    }

    const locale = (locales as readonly string[]).includes(body.locale as string) ? (body.locale as string) : 'ro';

    try {
        const volunteer = await prisma.volunteer.create({
            data: {
                ...result.data,
                locale,
                consentAt: new Date(),
                consentVersion: VOLUNTEER_CONSENT_VERSION,
            },
        });
        await notifyNewVolunteer(volunteer);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Volunteer sign-up failed', err);
        return NextResponse.json({ error: 'SERVER' }, { status: 500 });
    }
}
