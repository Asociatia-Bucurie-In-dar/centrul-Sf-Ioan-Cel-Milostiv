// Stable option keys for the volunteer form. These keys are what gets stored in the database,
// so renaming one orphans existing records - change labels in messages/*.json instead
// (VOLUNTEER.OPTIONS.<GROUP>.<KEY>). Adding or removing keys here is safe.

// Areas of involvement ("arii") - the reports' capacity table is built per area.
// Order = display order in the form.
export const VOLUNTEER_AREAS = [
    'PMO',
    'FUNDRAISING',
    'FINANCE',
    'CONSTRUCTION',
    'PREVENTION',
    'THERAPY',
    'MARKETING',
    'HR',
    'LOGISTICS',
    'IT',
    'LEGAL',
    'EVENTS',
    'BENEFICIARY_SUPPORT',
] as const;

// Skills ("competențe").
export const VOLUNTEER_SKILLS = [
    'PSYCHOLOGY',
    'SOCIAL_WORK',
    'ADDICTION',
    'CASE_MANAGEMENT',
    'MEDICAL',
    'SPIRITUAL',
    'EDUCATION',
    'RESEARCH',
    'LAW',
    'ACCOUNTING',
    'MANAGEMENT',
    'STRATEGY',
    'ENTREPRENEURSHIP',
    'FUNDRAISING',
    'PARTNERSHIPS',
    'HR',
    'PROCUREMENT',
    'MARKETING',
    'SOCIAL_MEDIA',
    'DESIGN',
    'PHOTO_VIDEO',
    'WRITING',
    'IT',
    'SALES',
    'EVENTS',
    'ARCHITECTURE',
    'CONSTRUCTION',
    'COOKING',
    'SPORTS',
    'ARTS',
    'DRIVING',
    'LANGUAGES',
] as const;

// Fields the volunteer has professional experience in ("domenii de experiență").
// Shown as a two-column checklist, so the order reads left-to-right, row by row.
export const VOLUNTEER_EXPERIENCE_DOMAINS = [
    'GENERAL_MANAGEMENT',
    'PROJECT_MANAGEMENT',
    'STRATEGY',
    'BUSINESS_DEVELOPMENT',
    'ENTREPRENEURSHIP',
    'FUNDRAISING',
    'SALES',
    'CORPORATE_PARTNERSHIPS',
    'MARKETING',
    'COMMUNICATION',
    'PR',
    'SOCIAL_MEDIA',
    'BRANDING',
    'FINANCE',
    'BUDGETING',
    'INVESTMENTS',
    'ARCHITECTURE',
    'PROCUREMENT',
    'LEGAL',
    'HR',
    'VOLUNTEER_MANAGEMENT',
    'PSYCHOLOGY',
    'MEDICAL',
    'ADDICTION',
    'PREVENTION',
    'EDUCATION',
    'COMMUNITIES',
    'RESEARCH',
    'IT',
    'EVENTS',
    'LOGISTICS',
    'GRANTS',
    'INSTITUTIONAL_RELATIONS',
    'OTHER',
] as const;

// What the volunteer needs from us to do the role well ("de ce ai avea nevoie").
export const VOLUNTEER_NEEDS = [
    'PROJECT_INFO',
    'CLEAR_ROLE',
    'TRAINING',
    'SPECIALISTS',
    'TOOLS',
    'BUDGET',
    'TEAM',
    'MATERIALS',
    'OTHER',
] as const;

// Ticking this key in a checklist reveals a free-text "which one?" field under it.
export const VOLUNTEER_OTHER_KEY = 'OTHER';

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
export const VOLUNTEER_CONSENT_VERSION = '2026-11-17';

export type VolunteerArea = (typeof VOLUNTEER_AREAS)[number];
export type VolunteerSkill = (typeof VOLUNTEER_SKILLS)[number];
export type VolunteerStatus = (typeof VOLUNTEER_STATUSES)[number];

// Option groups that have translated labels under VOLUNTEER.OPTIONS in messages/*.json.
export const VOLUNTEER_OPTION_GROUPS = {
    AREAS: VOLUNTEER_AREAS,
    SKILLS: VOLUNTEER_SKILLS,
    EXPERIENCE_DOMAINS: VOLUNTEER_EXPERIENCE_DOMAINS,
    NEEDS: VOLUNTEER_NEEDS,
    AVAILABILITY_TYPES: VOLUNTEER_AVAILABILITY_TYPES,
    TIME_SLOTS: VOLUNTEER_TIME_SLOTS,
    WORK_MODES: VOLUNTEER_WORK_MODES,
    COMMITMENTS: VOLUNTEER_COMMITMENTS,
    AGE_RANGES: VOLUNTEER_AGE_RANGES,
    SOURCES: VOLUNTEER_SOURCES,
} as const;

export type VolunteerOptionGroup = keyof typeof VOLUNTEER_OPTION_GROUPS;
export type VolunteerOptionLabels = Record<VolunteerOptionGroup, Record<string, string>>;
