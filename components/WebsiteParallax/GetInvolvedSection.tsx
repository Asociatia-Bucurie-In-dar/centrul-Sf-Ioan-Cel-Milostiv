import {Container, SimpleGrid, Card, Text, rem, ThemeIcon, Divider, Button, Center, Group} from '@mantine/core';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import commonClasses from '@/utils/commonClasses.module.css';
import classes from './GetInvolvedSection.module.css';
import {IconCoin, IconHandStop, IconBuildingCommunity, IconSpeakerphone} from '@tabler/icons-react';

const ways = [
    {key: 'DONATE', icon: IconCoin, color: 'orange'},
    {key: 'PARTNER', icon: IconBuildingCommunity, color: 'grape'},
    {key: 'PROMOTE', icon: IconSpeakerphone, color: 'green'},
    {key: 'VOLUNTEER', icon: IconHandStop, color: 'blue'},
] as const;

export function GetInvolvedSection() {
    const t = useTranslations('GET_INVOLVED');
    const commonT = useTranslations('COMMON');

    return (
        <Container size="full" pt={50} pb={55}>
            <Container size="lg">
                <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')} maxWidth="900px"/>

                <Text c="customDimmed" ta="center" mt="lg" fw={600} fz="lg">
                    {t('SUBTITLE')}
                </Text>

                <Divider mb="xl" color="transparent"/>

                <SimpleGrid cols={{base: 1, sm: 2, md: 4}} spacing="xl">
                    {ways.map(({key, icon: Icon, color}) => (
                        <Card key={key} shadow="md" radius="md" padding="xl" className={classes.card} ta="center">
                            <Center>
                                <ThemeIcon size={rem(60)} radius="xl" variant="light" color={color}>
                                    <Icon style={{width: rem(30), height: rem(30)}} stroke={1.5}/>
                                </ThemeIcon>
                            </Center>
                            <Text fz="lg" fw={700} mt="md">
                                {t(`WAYS.${key}.TITLE`)}
                            </Text>
                            <Text fz="sm" c="customDimmed" mt="xs" fw={500}>
                                {t(`WAYS.${key}.DESCRIPTION`)}
                            </Text>
                            {key === 'VOLUNTEER' && (
                                <Button component="a" href="/contact" variant="light" color={color} mt="md" fw={600}>
                                    {t('WAYS.VOLUNTEER.CTA')}
                                </Button>
                            )}
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
        </Container>
    );
}
