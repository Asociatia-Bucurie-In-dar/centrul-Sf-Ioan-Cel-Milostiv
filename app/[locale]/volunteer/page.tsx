import { Container, Divider } from '@mantine/core';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import commonClasses from '@/utils/commonClasses.module.css';
import { TitleWithDescription } from '@/components/Common/TitleWithDescription';
import { VolunteerForm } from '@/components/Volunteer/VolunteerForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'VOLUNTEER' });
    return {
        title: t('META_TITLE'),
        description: t('DESCRIPTION'),
    };
}

export default async function VolunteerPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'VOLUNTEER' });

    return (
        <Container size="md" className={commonClasses.container}>
            <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')} />
            <Divider color="transparent" mb="xl" />
            <VolunteerForm />
            <Divider color="transparent" pb={100} />
        </Container>
    );
}
