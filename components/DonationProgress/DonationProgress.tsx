import {Center, Container, Divider, Progress, rem, Space, Text} from '@mantine/core';
import classes from './DonationProgress.module.css';
import commonClasses from '@/utils/commonClasses.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {AnimatedThing} from "@/components/CoolEffects/AnimatedNumber/AnimatedThing";
import {useTranslations} from "next-intl";
import {PlanCarousel} from "@/components/PlanCarousel/PlanCarousel";
import {ProjectDonationProgress} from "@/components/Projects/ProjectDonationProgress";
import {ProjectTranslationsType} from "@/utils/my-types";
import {GetAllProjectsStaticContent} from "@/content/projects/projects-content";
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";

export function DonationProgress() {

         const t = useTranslations('DONATION_PROGRESS');
     const commonT = useTranslations('COMMON');
     const proj = GetAllProjectsStaticContent(1)[0];
     const projT = useTranslations('SAINT_JOHN');
     const projMoreT = useTranslations('PROJECTS_MORE');
     const headerT = useTranslations('HEADER');
    
     const donateT = useTranslations('PROJECTS_MORE');
     const donatePopupTranslations : ProjectTranslationsType = {
         Donate: projMoreT('DONATE'), //+ ' (' + projMoreT('OPTIONS') + ')',
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

    const data = [
        {
            title: '120,000 EUR',
            stats: t('STEPS.1'),
            progress: 5,
            description: '',
        },
        {
            title: '800,000 EUR',
            stats: t('STEPS.2'),
            progress: 0,
            description: '',
        },
        {
            title: '50,000 EUR',
            stats: t('STEPS.3'),
            progress: 0,
            description: '',
        }
    ];

    const stats = data.map((stat) => (
        <div key={stat.title} className={classes.stat}>
            <AnimatedThing thing={stat.stats.toLocaleString()} class={classes.count}/>
            <Text className={classes.title}>{stat.title}</Text>
            <Text className={classes.description} fw={500}>{stat.description}</Text>
            <Progress animated value={stat.progress} mt="md" size="lg" radius="xl"
                      aria-label={stat.title}
                      classNames={{
                          root: classes.progressTrack,
                          section: classes.progressSection,
                      }}/>
        </div>
    ));
    return <>
        <Container size="full" pt="xl" id="progressSection">
            <Container size="lg" py="xl">

                <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')} />

                <Divider color="transparent" mb="lg"/>
                <ProjectDonationProgress id={proj.id} goalAmount={980000} sumTranslation={commonT('NECESSARY_AMOUNT')} />
                
                <Container size="lg" mt="md" className={classes.root}>
                    {stats}
                </Container>

                <Divider color="transparent" mb="lg"/>
                <PlanCarousel />

                <Divider color="transparent" mt="sm"/>

                <Container mt="lg">
                    <Center>
                        <DonatePopupButton projectId={proj.id}
                                           projectTile={projT('TITLE')}
                                           fullWidth={true}
                                           size="lg"
                                           translations={donatePopupTranslations}/>
                    </Center>
                </Container>
                
            </Container>
            <Divider mb="md" color="transparent" />
        </Container>

    </>;
}


// import {
//     Container,
//     Divider,
//     Text,
//     Progress,
//     ProgressRoot,
//     ProgressSection,
//     ProgressLabel,
//     Center,
//     Image
// } from '@mantine/core';
// import classes from './DonationProgress.module.css';
// import commonClasses from '@/utils/commonClasses.module.css';
// import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
// import {useTranslations} from "next-intl";
// import {ProjectDonationProgress} from "@/components/Projects/ProjectDonationProgress";
// import {GetAllProjectsStaticContent} from "@/content/projects/projects-content";
// import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
// import {ProjectTranslationsType} from "@/utils/my-types";
// import {Carousel} from "@mantine/carousel";
// import {PlanCarousel} from "@/components/PlanCarousel/PlanCarousel";
//
// export function DonationProgress() {
//     const t = useTranslations('DONATION_PROGRESS');
//     const commonT = useTranslations('COMMON');
//     const proj = GetAllProjectsStaticContent(1)[0];
//     const projT = useTranslations('SAINT_JOHN');
//     const projMoreT = useTranslations('PROJECTS_MORE');
//     const headerT = useTranslations('HEADER');
//
//     const donateT = useTranslations('PROJECTS_MORE');
//     const donatePopupTranslations : ProjectTranslationsType = {
//         Donate: projMoreT('DONATE') + ' (' + projMoreT('OPTIONS') + ')',
//         CardOption: donateT('CARD_OPTION'),
//         BankTransferOption: donateT('BANK_TRANSFER_OPTION'),
//         DesiredAmount: donateT('DESIRED_AMOUNT'),
//         Continue: donateT('CONTINUE'),
//         DonateFor: donateT('DONATE_FOR'),
//         IAgreeWith: donateT('I_AGREE_TO_THE'),
//         TermsAndConditions: donateT('TERMS_AND_CONDITIONS'),
//         And: donateT('AND'),
//         PrivacyPolicy: donateT('PRIVACY_POLICY'),
//         Locale: headerT('LOCALE'),
//     };
//
//     return (
//         <Container size="md" mt={35} pb={47} className={classes.wrapper} id="progressSection">
//             <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')} />
//
//             <Divider color="transparent" mt="lg"/>
//            
//             <ProjectDonationProgress id={proj.id} goalAmount={980000} sumTranslation={commonT('NECESSARY_AMOUNT')} />
//            
//             <ProgressRoot size={19}>
//             <ProgressSection value={33} color="indigo">
//                 <ProgressLabel>{t('STEPS.1')}</ProgressLabel>
//             </ProgressSection>
//             <ProgressSection value={34} color="blue">
//                 <ProgressLabel>{t('STEPS.2')}</ProgressLabel>
//             </ProgressSection>
//             <ProgressSection value={33} color="cyan">
//                 <ProgressLabel>{t('STEPS.3')}</ProgressLabel>
//             </ProgressSection>
//         </ProgressRoot>
//
//             <Divider color="transparent" mt="sm"/>
//            
//             <Container mt="lg">
//                 <Center>
//                     <DonatePopupButton projectId={proj.id}
//                                        projectTile={projT('TITLE')}
//                                        fullWidth={true}
//                                        size="md"
//                                        translations={donatePopupTranslations}/>
//                 </Center>
//             </Container>
//
//             <Divider color="transparent" mb="lg"/>
//            
//             <PlanCarousel />
//            
//         </Container>
//     );
// }