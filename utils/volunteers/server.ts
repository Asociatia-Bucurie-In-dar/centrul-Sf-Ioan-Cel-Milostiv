import type { Volunteer } from '@prisma/client';
import ro from '@/messages/ro.json';
import { prisma } from '@/utils/prisma';
import { VOLUNTEER_OPTION_GROUPS, VolunteerOptionLabels } from '@/content/volunteer/volunteer-options';
import type { VolunteerRecord } from '@/utils/volunteers/admin-data';

// Romanian labels for every option key (the admin panel and exports are Romanian-only).
// Falls back to the key itself if a label is missing from messages/ro.json.
export function getRoOptionLabels(): VolunteerOptionLabels {
    const source = ro.VOLUNTEER.OPTIONS as Record<string, Record<string, string>>;
    const result = {} as VolunteerOptionLabels;
    for (const group of Object.keys(VOLUNTEER_OPTION_GROUPS) as (keyof typeof VOLUNTEER_OPTION_GROUPS)[]) {
        const labels: Record<string, string> = {};
        for (const key of VOLUNTEER_OPTION_GROUPS[group]) {
            labels[key] = source[group]?.[key] ?? key;
        }
        result[group] = labels;
    }
    return result;
}

export function toVolunteerRecord(v: Volunteer): VolunteerRecord {
    return {
        id: v.id,
        createdAt: v.createdAt.toISOString(),
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
        phone: v.phone,
        city: v.city,
        ageRange: v.ageRange,
        occupation: v.occupation,
        areas: v.areas,
        skills: v.skills,
        otherSkills: v.otherSkills,
        hoursPerWeek: v.hoursPerWeek,
        availabilityType: v.availabilityType,
        timeSlots: v.timeSlots,
        workMode: v.workMode,
        commitment: v.commitment,
        experience: v.experience,
        motivation: v.motivation,
        source: v.source,
        locale: v.locale,
        consentAt: v.consentAt.toISOString(),
        consentVersion: v.consentVersion,
        status: v.status,
        adminNotes: v.adminNotes,
    };
}

export async function loadVolunteers(): Promise<VolunteerRecord[]> {
    const rows = await prisma.volunteer.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map(toVolunteerRecord);
}

export async function loadAreaNeeds(): Promise<Record<string, number>> {
    const rows = await prisma.volunteerAreaNeed.findMany();
    const needs: Record<string, number> = {};
    for (const row of rows) needs[row.area] = row.hoursPerWeek;
    return needs;
}
