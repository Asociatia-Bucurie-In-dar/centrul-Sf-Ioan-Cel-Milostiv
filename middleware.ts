import createMiddleware from 'next-intl/middleware';

export const defaultLocale = 'ro';
export const locales = [defaultLocale, 'en'];

export default createMiddleware({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: defaultLocale,
    
    localePrefix: 'as-needed',
    localeDetection: false,
});

export const config = {
    matcher: ['/', '/(de|en)/:path*', '/((?!api|static|.*\\..*|_next).*)']
}

