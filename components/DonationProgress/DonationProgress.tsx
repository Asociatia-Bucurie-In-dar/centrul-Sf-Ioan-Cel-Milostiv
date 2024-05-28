import {Container, Divider, Text, Progress, ProgressRoot, ProgressSection, ProgressLabel, Center} from '@mantine/core';
import classes from './DonationProgress.module.css';
import commonClasses from '@/utils/commonClasses.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import {ProjectDonationProgress} from "@/components/Projects/ProjectDonationProgress";
import {GetAllProjectsStaticContent} from "@/content/projects/projects-content";
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
import {ProjectTranslationsType} from "@/utils/my-types";

export function DonationProgress() {
    const t = useTranslations('DONATION_PROGRESS');
    const commonT = useTranslations('COMMON');
    const proj = GetAllProjectsStaticContent(1)[0];
    const projT = useTranslations('SAINT_JOHN');
    const headerT = useTranslations('HEADER');

    const donateT = useTranslations('PROJECTS_MORE');
    const donatePopupTranslations : ProjectTranslationsType = {
        Donate: commonT('DONATE_NOW'),
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

    return (
        <Container size="md" mt={35} pb={47} className={classes.wrapper}>
            <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')} />

            <Divider color="transparent" mt="lg"/>
            
            <ProjectDonationProgress id={proj.id} goalAmount={800000} sumTranslation={commonT('NECESSARY_AMOUNT')} />

            <Divider color="transparent" mt={1}/>
            
            <ProgressRoot size="xl">
            <ProgressSection value={35} color="green">
                <ProgressLabel>{t('STEPS.1')}</ProgressLabel>
            </ProgressSection>
            <ProgressSection value={30} color="yellow">
                <ProgressLabel>{t('STEPS.2')}</ProgressLabel>
            </ProgressSection>
            <ProgressSection value={15} color="orange">
                <ProgressLabel>{t('STEPS.3')}</ProgressLabel>
            </ProgressSection>
            <ProgressSection value={20} color="cyan">
                <ProgressLabel>{t('STEPS.4')}</ProgressLabel>
            </ProgressSection>
        </ProgressRoot>

            <Divider color="transparent" mt="sm"/>
            
            <Container mt="lg">
                <Center>
                    <DonatePopupButton projectId={proj.id}
                                       projectTile={projT('TITLE')}
                                       fullWidth={true}
                                       translations={donatePopupTranslations}/>
                </Center>
            </Container>
            
        </Container>
    );
}