import {Alert, Anchor, Badge, Container, Group, Paper, Progress, SimpleGrid, Stack, Text, ThemeIcon, Title, rem} from '@mantine/core';
import {IconCheck, IconClock, IconInfoCircle, IconPointFilled} from '@tabler/icons-react';
import {useLocale, useTranslations} from "next-intl";
import {Link} from "@/navigation";
import commonClasses from '@/utils/commonClasses.module.css';
import {projectStatus, StepStatus} from "@/content/project-status";
import {MyRoutePaths} from "@/utils/route-paths";

const statusLook: Record<StepStatus, {color: string, icon: typeof IconCheck, label: string}> = {
    done: {color: 'teal', icon: IconCheck, label: 'DONE'},
    inProgress: {color: 'orange', icon: IconClock, label: 'IN_PROGRESS'},
    notStarted: {color: 'gray', icon: IconPointFilled, label: 'NOT_STARTED'},
};

export function ProjectStatus() {
    const t = useTranslations('PROJECT_STATUS');
    const locale = useLocale();

    const [year, month] = projectStatus.updatedAt.split('-').map(Number);
    const updated = new Intl.DateTimeFormat(locale, {month: 'long', year: 'numeric'}).format(new Date(year, month - 1));
    const eur = new Intl.NumberFormat(locale, {style: 'currency', currency: 'EUR', maximumFractionDigits: 0});

    const {goalEur, raisedEur} = projectStatus.funding;
    const hasFunding = goalEur !== null && raisedEur !== null && goalEur > 0;
    const percent = hasFunding ? Math.round((raisedEur / goalEur) * 100) : 0;
    const opening = projectStatus.estimatedOpening?.[locale as 'ro' | 'en'];

    return (
        <Container size="full" pt={50} pb={50}>
            <Container size="md">
                <Title order={2} className={commonClasses.titleBig} ta="center">
                    {t('TITLE')}
                </Title>
                <Text c="customDimmed" ta="center" fw={500} mt="xs">
                    {t('UPDATED')} {updated}
                </Text>

                <Alert variant="light" color="blue" radius="md" mt="xl" icon={<IconInfoCircle/>}>
                    <Text fw={700}>{t('NOTICE')}</Text>
                    <Text size="sm" mt={4}>
                        {t('NOTICE_HELP')}{' '}
                        <Link href={MyRoutePaths.Help}>
                            <Anchor component="span" fw={700} inherit>{t('NOTICE_HELP_LINK')}</Anchor>
                        </Link>
                    </Text>
                </Alert>

                <SimpleGrid cols={{base: 2, sm: 4}} spacing="md" mt="xl">
                    {projectStatus.steps.map(({key, status}) => {
                        const look = statusLook[status];
                        return (
                            <Paper key={key} withBorder radius="md" p="md" ta="center">
                                <Stack align="center" gap="xs">
                                    <ThemeIcon color={look.color} variant="light" radius="xl" size={rem(40)}>
                                        <look.icon style={{width: rem(22), height: rem(22)}}/>
                                    </ThemeIcon>
                                    <Text fw={700}>{t(`STEPS.${key}`)}</Text>
                                    <Badge color={look.color} variant="light">{t(`STATUS.${look.label}`)}</Badge>
                                </Stack>
                            </Paper>
                        );
                    })}
                </SimpleGrid>

                {hasFunding && (
                    <Paper withBorder radius="md" p="lg" mt="md">
                        <Text fw={700} fz="lg">{t('FUNDING_TITLE')}</Text>
                        <Group justify="space-between" mt="sm">
                            <Text c="customDimmed" fw={500}>{t('RAISED')}: <b>{eur.format(raisedEur)}</b></Text>
                            <Text c="customDimmed" fw={500}>{t('GOAL')}: <b>{eur.format(goalEur)}</b></Text>
                        </Group>
                        <Progress value={percent} mt="sm" size="lg" radius="xl" color="teal" aria-label={t('FUNDING_TITLE')}/>
                        <Text ta="right" fw={700} mt={4}>{percent}% {t('OF_TOTAL')}</Text>
                    </Paper>
                )}

                {opening && (
                    <Text ta="center" fw={600} mt="md">
                        {t('OPENING')}: {opening}
                    </Text>
                )}
            </Container>
        </Container>
    );
}
