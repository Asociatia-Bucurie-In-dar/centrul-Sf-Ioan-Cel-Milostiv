import commonClasses from "@/utils/commonClasses.module.css";
import {Alert, Anchor, Button, Container, Divider, Group, Paper, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import {IconAlertTriangle, IconBrandWhatsapp, IconInfoCircle, IconMail, IconPhone} from "@tabler/icons-react";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";
import {use} from "react";
import {emergencyNumber, helpLines, toTelLink} from "@/content/help/help-lines";
import {contactInfo} from "@/content/contact/my-contact";

export async function generateMetadata({params}: { params: Promise<{locale: string}> }) {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'HELP'});
    return {
        title: t('TITLE'),
        description: t('META_DESCRIPTION'),
    };
}

export default function HelpPage({params}: {params: Promise<{locale: string}>}) {
    const {locale} = use(params);
    setRequestLocale(locale);
    const t = useTranslations('HELP');

    return (
        <Container size="md" className={commonClasses.container} pb={100}>
            <Title order={1} className={commonClasses.titleBig} ta="center">{t('TITLE')}</Title>

            <Alert variant="light" color="blue" radius="md" mt="xl" icon={<IconInfoCircle/>} title={t('NOT_OPERATIONAL_TITLE')}>
                <Text>{t('NOT_OPERATIONAL_TEXT')}</Text>
            </Alert>

            <Alert variant="filled" color="red" radius="md" mt="md" icon={<IconAlertTriangle/>} title={t('EMERGENCY_TITLE')}>
                <Group justify="space-between" wrap="wrap">
                    <Text>{t('EMERGENCY_TEXT')}</Text>
                    <Button component="a" href={toTelLink(emergencyNumber)} color="white" variant="white" c="red" fw={700}
                            leftSection={<IconPhone size={18}/>}>
                        {emergencyNumber}
                    </Button>
                </Group>
            </Alert>

            <Title order={2} fz="xl" mt={40} mb="md">{t('LINES_TITLE')}</Title>
            <SimpleGrid cols={{base: 1, sm: 2}} spacing="md">
                {helpLines.map((line) => (
                    <Paper key={line.key} withBorder radius="md" p="lg">
                        <Stack gap={6}>
                            <Text fw={700} fz="lg">{line.name}</Text>
                            <Text c="customDimmed" fw={500} fz="sm">{t(`LINES.${line.key}`)}</Text>
                            <Anchor href={toTelLink(line.phone)} fw={700} fz="xl">{line.phone}</Anchor>
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>

            <Paper withBorder radius="md" p="xl" mt={40}>
                <Title order={2} fz="xl">{t('GUIDANCE_TITLE')}</Title>
                <Text mt="sm" fw={500}>{t('GUIDANCE_TEXT')}</Text>
                <Group mt="lg" gap="sm" wrap="wrap">
                    <Button component="a" href={toTelLink(contactInfo.phone)} leftSection={<IconPhone size={18}/>} fw={600}>
                        {contactInfo.phone}
                    </Button>
                    <Button component="a" href={'https://wa.me/' + contactInfo.phoneForWhatsapp} target="_blank" rel="noopener noreferrer"
                            variant="light" color="green" leftSection={<IconBrandWhatsapp size={18}/>} fw={600}>
                        WhatsApp
                    </Button>
                    <Button component="a" href={'mailto:' + contactInfo.email} variant="light" leftSection={<IconMail size={18}/>} fw={600}>
                        {contactInfo.email}
                    </Button>
                </Group>
            </Paper>

            <Divider color="transparent" mt="xl"/>
            <Text c="customDimmed" fz="sm" ta="center">{t('DISCLAIMER')}</Text>
        </Container>
    );
}
