import {
    VOLUNTEER_AGE_RANGES,
    VOLUNTEER_AREAS,
    VOLUNTEER_AVAILABILITY_TYPES,
    VOLUNTEER_COMMITMENTS,
    VOLUNTEER_HOURS_MAX,
    VOLUNTEER_HOURS_MIN,
    VOLUNTEER_SKILLS,
    VOLUNTEER_SOURCES,
    VOLUNTEER_TIME_SLOTS,
    VOLUNTEER_WORK_MODES,
} from '@/content/volunteer/volunteer-options';

// Shared by the public form (instant feedback) and the API route (authoritative check).

export type VolunteerFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    ageRange: string;
    occupation: string;
    areas: string[];
    skills: string[];
    otherSkills: string;
    hoursPerWeek: number | string;
    availabilityType: string;
    timeSlots: string[];
    workMode: string;
    commitment: string;
    experience: string;
    motivation: string;
    source: string;
    consent: boolean;
};

export type VolunteerData = {
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
};

// Each code maps to VOLUNTEER.ERRORS.<code> in messages/*.json.
export type VolunteerFieldError =
    | 'REQUIRED'
    | 'INVALID_EMAIL'
    | 'INVALID_PHONE'
    | 'SELECT_AT_LEAST_ONE'
    | 'INVALID_HOURS'
    | 'TOO_LONG'
    | 'CONSENT_REQUIRED';

export type VolunteerErrors = Partial<Record<keyof VolunteerFormValues, VolunteerFieldError>>;

export type VolunteerValidationResult =
    | { ok: true; data: VolunteerData }
    | { ok: false; errors: VolunteerErrors };

export const EMPTY_VOLUNTEER_FORM: VolunteerFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    ageRange: '',
    occupation: '',
    areas: [],
    skills: [],
    otherSkills: '',
    hoursPerWeek: '',
    availabilityType: '',
    timeSlots: [],
    workMode: '',
    commitment: '',
    experience: '',
    motivation: '',
    source: '',
    consent: false,
};

const SHORT = 80;
const MEDIUM = 300;
const LONG = 2000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9 ()./-]{7,20}$/;

function str(value: unknown): string {
    return typeof value === 'string' ? value.trim() : '';
}

function pickOptions(value: unknown, allowed: readonly string[]): string[] {
    if (!Array.isArray(value)) {
        return [];
    }
    const result: string[] = [];
    for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (typeof item === 'string' && allowed.includes(item) && !result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}

function pickOption(value: unknown, allowed: readonly string[]): string {
    return typeof value === 'string' && allowed.includes(value) ? value : '';
}

export function validateVolunteer(raw: Record<string, unknown>): VolunteerValidationResult {
    const errors: VolunteerErrors = {};

    const requiredText = (field: keyof VolunteerFormValues, max: number): string => {
        const value = str(raw[field]);
        if (!value) errors[field] = 'REQUIRED';
        else if (value.length > max) errors[field] = 'TOO_LONG';
        return value;
    };
    const optionalText = (field: keyof VolunteerFormValues, max: number): string | null => {
        const value = str(raw[field]);
        if (value.length > max) errors[field] = 'TOO_LONG';
        return value || null;
    };
    const requiredOption = (field: keyof VolunteerFormValues, allowed: readonly string[]): string => {
        const value = pickOption(raw[field], allowed);
        if (!value) errors[field] = 'REQUIRED';
        return value;
    };

    const firstName = requiredText('firstName', SHORT);
    const lastName = requiredText('lastName', SHORT);

    const email = requiredText('email', 254).toLowerCase();
    if (email && !errors.email && !EMAIL_REGEX.test(email)) errors.email = 'INVALID_EMAIL';

    const phone = requiredText('phone', 30);
    if (phone && !errors.phone && (!PHONE_REGEX.test(phone) || phone.replace(/\D/g, '').length < 7)) {
        errors.phone = 'INVALID_PHONE';
    }

    const city = optionalText('city', SHORT);
    const ageRange = requiredOption('ageRange', VOLUNTEER_AGE_RANGES);
    const occupation = optionalText('occupation', MEDIUM);

    const areas = pickOptions(raw.areas, VOLUNTEER_AREAS);
    if (areas.length === 0) errors.areas = 'SELECT_AT_LEAST_ONE';
    const skills = pickOptions(raw.skills, VOLUNTEER_SKILLS);
    const otherSkills = optionalText('otherSkills', MEDIUM);

    const hours = Number(raw.hoursPerWeek);
    if (raw.hoursPerWeek === '' || raw.hoursPerWeek === null || raw.hoursPerWeek === undefined) {
        errors.hoursPerWeek = 'REQUIRED';
    } else if (!Number.isInteger(hours) || hours < VOLUNTEER_HOURS_MIN || hours > VOLUNTEER_HOURS_MAX) {
        errors.hoursPerWeek = 'INVALID_HOURS';
    }

    const availabilityType = requiredOption('availabilityType', VOLUNTEER_AVAILABILITY_TYPES);
    const timeSlots = pickOptions(raw.timeSlots, VOLUNTEER_TIME_SLOTS);
    const workMode = requiredOption('workMode', VOLUNTEER_WORK_MODES);
    const commitment = requiredOption('commitment', VOLUNTEER_COMMITMENTS);

    const experience = optionalText('experience', LONG);
    const motivation = optionalText('motivation', LONG);
    const source = pickOption(raw.source, VOLUNTEER_SOURCES) || null;

    if (raw.consent !== true) errors.consent = 'CONSENT_REQUIRED';

    if (Object.keys(errors).length > 0) {
        return { ok: false, errors };
    }

    return {
        ok: true,
        data: {
            firstName,
            lastName,
            email,
            phone,
            city,
            ageRange,
            occupation,
            areas,
            skills,
            otherSkills,
            hoursPerWeek: hours,
            availabilityType,
            timeSlots,
            workMode,
            commitment,
            experience,
            motivation,
            source,
        },
    };
}
