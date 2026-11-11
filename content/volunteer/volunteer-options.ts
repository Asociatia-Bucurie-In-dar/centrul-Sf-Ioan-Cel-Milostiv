// Stable option keys for the volunteer form. These keys are what gets stored in the database,
// so renaming one orphans existing records - change labels in messages/*.json instead
// (VOLUNTEER.OPTIONS.<GROUP>.<KEY>). Adding or removing keys here is safe.

// Areas of involvement ("arii") - the reports' capacity table is built per area.
export const VOLUNTEER_AREAS = [
    'FUNDRAISING',
    'MARKETING',
    'PREVENTION',
    'PMO',
    'LEGAL',
    'FINANCE',
    'BENEFICIARY_SUPPORT',
    'EVENTS',
    'CONSTRUCTION',
    'IT',
    'LOGISTICS',
] as const;

// Skills ("competențe").
export const VOLUNTEER_SKILLS = [
    'PSYCHOLOGY',
    'SOCIAL_WORK',
    'MEDICAL',
    'SPIRITUAL',
    'EDUCATION',
    'LAW',
    'ACCOUNTING',
    'MANAGEMENT',
    'MARKETING',
    'SOCIAL_MEDIA',
    'DESIGN',
    'PHOTO_VIDEO',
    'WRITING',
    'IT',
    'SALES',
    'EVENTS',
    'CONSTRUCTION',
    'COOKING',
    'SPORTS',
    'ARTS',
    'DRIVING',
    'LANGUAGES',
] as const;

export const VOLUNTEER_AVAILABILITY_TYPES = ['CONSTANT', 'OCCASIONAL'] as const;

export const VOLUNTEER_TIME_SLOTS = ['WEEKDAY_MORNING', 'WEEKDAY_AFTERNOON', 'WEEKDAY_EVENING', 'WEEKEND'] as const;

export const VOLUNTEER_WORK_MODES = ['ONSITE', 'REMOTE', 'BOTH'] as const;

// How long the volunteer commits to ("durata asumată").
export const VOLUNTEER_COMMITMENTS = ['UP_TO_3M', 'M3_6', 'M6_12', 'OVER_1Y', 'UNDECIDED'] as const;

export const VOLUNTEER_AGE_RANGES = ['18_25', '26_35', '36_45', '46_60', '60_PLUS'] as const;

export const VOLUNTEER_SOURCES = ['SOCIAL_MEDIA', 'FRIENDS', 'CHURCH', 'EVENT', 'WEBSITE', 'OTHER'] as const;

// Admin-only pipeline status. Labels are Romanian-only (admin panel is not translated).
export const VOLUNTEER_STATUSES = ['NEW', 'CONTACTED', 'ACTIVE', 'PAUSED', 'INACTIVE'] as const;
export const VOLUNTEER_STATUS_LABELS: Record<VolunteerStatus, string> = {
    NEW: 'Nou',
    CONTACTED: 'Contactat',
    ACTIVE: 'Activ',
    PAUSED: 'În pauză',
    INACTIVE: 'Inactiv',
};
export const VOLUNTEER_STATUS_COLORS: Record<VolunteerStatus, string> = {
    NEW: 'blue',
    CONTACTED: 'yellow',
    ACTIVE: 'green',
    PAUSED: 'gray',
    INACTIVE: 'red',
};

export const VOLUNTEER_HOURS_MIN = 1;
export const VOLUNTEER_HOURS_MAX = 40;

// Bump when the consent text in messages/*.json (VOLUNTEER.CONSENT) or the volunteer section
// of the privacy policy changes, so each record shows which version the person agreed to.
export const VOLUNTEER_CONSENT_VERSION = '2026-11-11';

export type VolunteerArea = (typeof VOLUNTEER_AREAS)[number];
export type VolunteerSkill = (typeof VOLUNTEER_SKILLS)[number];
export type VolunteerStatus = (typeof VOLUNTEER_STATUSES)[number];

// Option groups that have translated labels under VOLUNTEER.OPTIONS in messages/*.json.
export const VOLUNTEER_OPTION_GROUPS = {
    AREAS: VOLUNTEER_AREAS,
    SKILLS: VOLUNTEER_SKILLS,
    AVAILABILITY_TYPES: VOLUNTEER_AVAILABILITY_TYPES,
    TIME_SLOTS: VOLUNTEER_TIME_SLOTS,
    WORK_MODES: VOLUNTEER_WORK_MODES,
    COMMITMENTS: VOLUNTEER_COMMITMENTS,
    AGE_RANGES: VOLUNTEER_AGE_RANGES,
    SOURCES: VOLUNTEER_SOURCES,
} as const;

export type VolunteerOptionGroup = keyof typeof VOLUNTEER_OPTION_GROUPS;
export type VolunteerOptionLabels = Record<VolunteerOptionGroup, Record<string, string>>;
