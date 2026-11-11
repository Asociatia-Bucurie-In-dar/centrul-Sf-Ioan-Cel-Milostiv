import { VOLUNTEER_AREAS } from '@/content/volunteer/volunteer-options';

// Pure helpers shared by the admin UI (client) and the Excel export route (server),
// so the export always matches what the admin sees on screen.

export type VolunteerRecord = {
    id: number;
    createdAt: string; // ISO
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string | null;
    ageRange: string;
    occupation: string | null;
    areas: string[];
    skills: string[];
    otherSkills: string | null;
    hoursPerWeek: number;
    availabilityType: string;
    timeSlots: string[];
    workMode: string;
    commitment: string;
    experience: string | null;
    motivation: string | null;
    source: string | null;
    locale: string;
    consentAt: string; // ISO
    consentVersion: string;
    status: string;
    adminNotes: string | null;
};

// ---------- Filters ----------

export type VolunteerFilters = {
    q: string;
    status: string;
    area: string;
    skill: string;
    availabilityType: string;
    workMode: string;
};

export const EMPTY_FILTERS: VolunteerFilters = {
    q: '',
    status: '',
    area: '',
    skill: '',
    availabilityType: '',
    workMode: '',
};

const FILTER_KEYS = Object.keys(EMPTY_FILTERS) as (keyof VolunteerFilters)[];

export function normalizeSearch(value: string): string {
    return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function searchableText(v: VolunteerRecord): string {
    return normalizeSearch(
        [v.firstName, v.lastName, v.email, v.phone, v.city, v.occupation, v.otherSkills, v.adminNotes]
            .filter(Boolean)
            .join(' ')
    );
}

export function filterVolunteers(list: VolunteerRecord[], f: VolunteerFilters): VolunteerRecord[] {
    const q = normalizeSearch(f.q);
    return list.filter((v) =>
        (!f.status || v.status === f.status) &&
        (!f.area || v.areas.includes(f.area)) &&
        (!f.skill || v.skills.includes(f.skill)) &&
        (!f.availabilityType || v.availabilityType === f.availabilityType) &&
        (!f.workMode || v.workMode === f.workMode) &&
        (!q || searchableText(v).includes(q))
    );
}

export function filtersToQuery(f: VolunteerFilters): string {
    const params = new URLSearchParams();
    for (const key of FILTER_KEYS) {
        if (f[key]) params.set(key, f[key]);
    }
    return params.toString();
}

export function filtersFromParams(params: URLSearchParams): VolunteerFilters {
    const f = { ...EMPTY_FILTERS };
    for (const key of FILTER_KEYS) {
        f[key] = params.get(key) ?? '';
    }
    return f;
}

// ---------- Reports ----------

// ACTIVE: only volunteers marked active. PIPELINE: active + not yet processed (new, contacted).
export type ReportScope = 'ACTIVE' | 'PIPELINE';
const PIPELINE_STATUSES = ['NEW', 'CONTACTED', 'ACTIVE'];

export function volunteersInScope(list: VolunteerRecord[], scope: ReportScope): VolunteerRecord[] {
    return scope === 'ACTIVE'
        ? list.filter((v) => v.status === 'ACTIVE')
        : list.filter((v) => PIPELINE_STATUSES.includes(v.status));
}

export type AreaCapacityRow = {
    area: string;
    volunteers: number;
    constant: number;
    hours: number; // available hours / week, volunteer's hours split evenly across their chosen areas
    need: number; // estimated hours / week needed (set by admins)
    gap: number; // hours - need
};

export function computeAreaCapacity(list: VolunteerRecord[], needs: Record<string, number>) {
    const rows: AreaCapacityRow[] = VOLUNTEER_AREAS.map((area) => ({
        area,
        volunteers: 0,
        constant: 0,
        hours: 0,
        need: needs[area] ?? 0,
        gap: 0,
    }));
    const byArea = new Map(rows.map((r) => [r.area, r]));

    for (const v of list) {
        if (v.areas.length === 0) continue;
        const share = v.hoursPerWeek / v.areas.length;
        for (const area of v.areas) {
            const row = byArea.get(area);
            if (!row) continue;
            row.volunteers += 1;
            if (v.availabilityType === 'CONSTANT') row.constant += 1;
            row.hours += share;
        }
    }

    const totals = { volunteers: list.length, hours: 0, need: 0, gap: 0 };
    for (const row of rows) {
        row.hours = Math.round(row.hours * 10) / 10;
        row.gap = Math.round((row.hours - row.need) * 10) / 10;
        totals.hours += row.hours;
        totals.need += row.need;
    }
    totals.hours = Math.round(totals.hours * 10) / 10;
    totals.gap = Math.round((totals.hours - totals.need) * 10) / 10;

    return { rows, totals };
}

// Counts how many volunteers picked each key. Works for single- and multi-value fields.
export function countByKey(
    list: VolunteerRecord[],
    keys: readonly string[],
    pick: (v: VolunteerRecord) => string | string[] | null
): { key: string; count: number }[] {
    const counts = new Map<string, number>(keys.map((k) => [k, 0]));
    for (const v of list) {
        const value = pick(v);
        if (value === null) continue;
        if (Array.isArray(value)) {
            for (const k of value) {
                if (counts.has(k)) counts.set(k, (counts.get(k) ?? 0) + 1);
            }
        } else if (counts.has(value)) {
            counts.set(value, (counts.get(value) ?? 0) + 1);
        }
    }
    return keys.map((key) => ({ key, count: counts.get(key) ?? 0 }));
}

export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('ro-RO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Europe/Bucharest',
    });
}

export function formatDateTime(iso: string): string {
    return new Date(iso).toLocaleString('ro-RO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Bucharest',
    });
}
