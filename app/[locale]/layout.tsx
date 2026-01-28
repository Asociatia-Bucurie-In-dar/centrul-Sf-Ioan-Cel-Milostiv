import '@mantine/core/styles.css';
import React from 'react';
import {MantineProvider, ColorSchemeScript, createTheme} from '@mantine/core';
import {Analytics} from "@vercel/analytics/next";
import BypassMaintenance from '@/components/Maintenance/BypassMaintenance';
import {locales} from "@/middleware";
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';

export function generateStaticParams() {
    return locales.map((locale:string) => ({locale}));
}

export async function generateMetadata({children, params: {locale}}: { children: React.ReactNode; params: {locale: string}; }) {
    const saintT = await getTranslations({locale: locale, namespace: 'SAINT_JOHN'});
    const heroT = await getTranslations({locale: locale, namespace: 'HOME_HERO'});
    const title = saintT('TITLE');
    const description = saintT('DESCRIPTION');
    return {
        title: {
            default: title,
            template: '%s | ' + title,
        },
        description: heroT('DESCRIPTION'),
    };
}


export default function RootLayout({children, params: { locale }}: { children: React.ReactNode; params: { locale: string }; }) {
    unstable_setRequestLocale(locale);

    const theme = createTheme({
        colors: {
            customDimmed: [
                '#000000',
                '#000000',
                '#000000',
                '#000000',
                '#9297A0',
                '#000000',
                '#727A83',
                '#000000',
                '#000000',
                '#000000',
            ],
        }
    });


    return (
        <html lang={"ro"}>
        <head>
            <ColorSchemeScript/>
            <link rel="shortcut icon" href="/sfIoan.png"/>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        </head>
        <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
            <BypassMaintenance>{children}</BypassMaintenance>
        </MantineProvider>
        <Analytics />
        </body>
        </html>
    );
}

