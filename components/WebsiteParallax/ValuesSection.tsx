import {Container, SimpleGrid, Card, Text, rem, ThemeIcon, Divider} from '@mantine/core';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import classes from './ValuesSection.module.css';
import {
    IconStar,
    IconYinYang,
    IconSunrise,
    IconUsersGroup,
    IconLeaf,
    IconHeartHandshake,
} from '@tabler/icons-react';

const values = [
    {key: 'DIGNITY', icon: IconStar, color: 'yellow'},
    {key: 'WHOLENESS', icon: IconYinYang, color: 'blue'},
    {key: 'FREEDOM', icon: IconSunrise, color: 'orange'},
    {key: 'COMMUNITY', icon: IconUsersGroup, color: 'green'},
    {key: 'SUSTAINABILITY', icon: IconLeaf, color: 'teal'},
    {key: 'LOVE', icon: IconHeartHandshake, color: 'red'},
] as const;

export function ValuesSection() {
    const t = useTranslations('VALUES');

    return (
        <Container size="full" pt={50} pb={55}>
            <Container size="lg">
                <TitleWithDescription title={t('TITLE')}/>

                <Divider mb="xl" color="transparent"/>

                <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="xl">
                    {values.map(({key, icon: Icon, color}) => (
                        <Card key={key} shadow="sm" radius="md" padding="xl" className={classes.card}>
                            <ThemeIcon size={rem(48)} radius="xl" variant="light" color={color}>
                                <Icon style={{width: rem(26), height: rem(26)}} stroke={1.5}/>
                            </ThemeIcon>
                            <Text fz="lg" fw={700} mt="md">
                                {t(`ITEMS.${key}.TITLE`)}
                            </Text>
                            <Text fz="sm" c="customDimmed" mt="xs" fw={500}>
                                {t(`ITEMS.${key}.DESCRIPTION`)}
                            </Text>
                        </Card>
                    ))}
                </SimpleGrid>
            </Container>
        </Container>
    );
}
