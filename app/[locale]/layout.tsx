import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { ChatButton } from '@/components/ChatButton/ChatButton';
import { theme } from '@/theme';
import FirstTimeConfetti from "@/components/CoolEffects/FirstTimeConfetti";
//import WavySeparator from '@/components/WavySeparator/WavySeparator';
import {locales} from "@/middleware";
import {unstable_setRequestLocale} from 'next-intl/server';
import {useTranslations} from "next-intl";
import {ProjectTranslationsType} from "@/utils/my-types";
import {GetAllProjectsStaticContent} from "@/content/projects/projects-content";
import '@mantine/carousel/styles.css';

export function generateStaticParams() {
    return locales.map((locale:string) => ({locale}));
}

export const metadata = {
  title: {
      default: 'Centrul Sfântul Ioan Cel Milostiv',
      template: '%s | Centrul Sfântul Ioan Cel Milostiv',
  },
  description: 'Avem toată nădejdea și cred cu tărie că echipa Centrului Sf. Ioan Cel Milostiv se va strădui să aducă alinare, vindecare și să fie sprijin celor care nu mai au pe cine să se sprijine.',
};

export default function RootLayout({children, params: { locale }}: { children: React.ReactNode; params: { locale: string }; }) {
    unstable_setRequestLocale(locale);

    const headerT = useTranslations('HEADER');
    const donateT = useTranslations('PROJECTS_MORE');
    const donatePopupTranslations : ProjectTranslationsType = {
        Donate: donateT('DONATE'),
        CardOption: donateT('CARD_OPTION'),
        BankTransferOption: donateT('BANK_TRANSFER_OPTION'),
        DesiredAmount: donateT('DESIRED_AMOUNT'),
        Continue: donateT('CONTINUE'),
        DonateFor: donateT('DONATE_FOR')
    };

    const proj = GetAllProjectsStaticContent(1)[0];
    const projT = useTranslations('SAINT_JOHN');

    const headerProps = {
        home: { label: headerT('HOME.LABEL'), link: headerT('HOME.LINK') },
        // projects: { label: headerT('PROJECTS.LABEL'), link: headerT('PROJECTS.LINK') },
        // about: { label: headerT('ABOUT.LABEL'), link: headerT('ABOUT.LINK') },
        // gallery: { label: headerT('GALLERY.LABEL'), link: headerT('GALLERY.LINK') },
        // blog: { label: headerT('BLOG.LABEL'), link: headerT('BLOG.LINK') },
        contact: { label: headerT('CONTACT.LABEL'), link: headerT('CONTACT.LINK') },
        donatePopupTranslations: donatePopupTranslations,
        project: {
            title: projT('TITLE'),
            description: projT('DESCRIPTION'),
            image_alt: projT('IMAGE_ALT'),
        }
    };
    
  return (
    <html lang={"ro"}>
    <head>
        <ColorSchemeScript/>
        <link rel="shortcut icon" href="/sfIoan.png"/>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
    </head>
    <body>
    <MantineProvider theme={theme} defaultColorScheme="light">
        <Header headerProps={headerProps} locale={locale}/>
        {children}
        <ChatButton />
        <Footer/>
    </MantineProvider>

    <FirstTimeConfetti/>
    </body>
    </html>
  );
}
