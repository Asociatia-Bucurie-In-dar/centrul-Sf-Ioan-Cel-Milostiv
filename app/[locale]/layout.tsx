import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';
import {NextIntlClientProvider} from 'next-intl';
import {Analytics} from "@vercel/analytics/next";
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ChatButton } from '@/components/ChatButton/ChatButton';
import {locales} from "@/i18n/routing";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectTranslationsType } from '@/utils/my-types';
import { GetAllProjectsStaticContent } from '@/content/projects/projects-content';

export function generateStaticParams() {
    return locales.map((locale:string) => ({locale}));
}

export async function generateMetadata({params}: { params: Promise<{locale: string}> }) {
    const {locale} = await params;
    const saintT = await getTranslations({locale: locale, namespace: 'SAINT_JOHN'});
    const heroT = await getTranslations({locale: locale, namespace: 'HOME_HERO'});
    const title = saintT('TITLE');
    return {
        title: {
            default: title,
            template: `%s | ${title}`,
        },
        description: heroT('DESCRIPTION'),
    };
}

export default async function RootLayout({children, params}: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {
    const {locale} = await params;
    setRequestLocale(locale);

    const headerT = await getTranslations({locale, namespace: 'HEADER'});
    const donateT = await getTranslations({locale, namespace: 'PROJECTS_MORE'});
    const projT = await getTranslations({locale, namespace: 'SAINT_JOHN'});
    const donatePopupTranslations : ProjectTranslationsType = {
        Donate: donateT('DONATE'),
        CardOption: donateT('CARD_OPTION'),
        BankTransferOption: donateT('BANK_TRANSFER_OPTION'),
        DesiredAmount: donateT('DESIRED_AMOUNT'),
        Continue: donateT('CONTINUE'),
        DonateFor: donateT('DONATE_FOR'),
        IAgreeWith: donateT('I_AGREE_TO_THE'),
        TermsAndConditions: donateT('TERMS_AND_CONDITIONS'),
        And: donateT('AND'),
        PrivacyPolicy: donateT('PRIVACY_POLICY'),
        Locale: headerT('LOCALE'),
    };

    const proj = GetAllProjectsStaticContent(1)[0];

    const headerProps = {
        id: proj.id,
        home: { label: headerT('HOME.LABEL'), link: headerT('HOME.LINK') },
        contact: { label: headerT('CONTACT.LABEL'), link: headerT('CONTACT.LINK') },
        donatePopupTranslations: donatePopupTranslations,
        project: {
            title: projT('TITLE'),
            description: projT('DESCRIPTION'),
            image_alt: projT('IMAGE_ALT'),
        },
        burgerMenuLabel: headerT('BURGER_MENU'),
    };

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
        <html lang={locale}>
        <head>
            <ColorSchemeScript/>
            <link rel="shortcut icon" href="/sfIoan.png"/>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        </head>
        <body>
        <NextIntlClientProvider>
        <MantineProvider theme={theme} defaultColorScheme="light">
            <Header headerProps={headerProps} locale={locale} />
            <main style={{ minHeight: '80vh' }}>
                {children}
            </main>
            <ChatButton />
            <Footer />
        </MantineProvider>
        </NextIntlClientProvider>
        <Analytics />
        </body>
        </html>
    );
}

