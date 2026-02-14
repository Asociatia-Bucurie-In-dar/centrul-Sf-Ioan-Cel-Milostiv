import {defineRouting} from 'next-intl/routing';

export const defaultLocale = 'ro';
export const locales = [defaultLocale, 'en'] as const;

export const routing = defineRouting({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
    localeDetection: false,
});
