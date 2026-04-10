import {Container, SimpleGrid, Card, Text, rem, ThemeIcon, Divider} from '@mantine/core';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import commonClasses from '@/utils/commonClasses.module.css';
import classes from './FacilitiesSection.module.css';
import {
    IconRun,
    IconFeather,
    IconPlant2,
    IconFlower,
    IconPalette,
    IconBook,
} from '@tabler/icons-react';

const facilities = [
    {key: 'GYM', icon: IconRun, color: 'blue'},
    {key: 'EQUINE', icon: IconFeather, color: 'green'},
    {key: 'GREENHOUSE', icon: IconPlant2, color: 'teal'},
    {key: 'GARDEN', icon: IconFlower, color: 'yellow'},
    {key: 'ARTS', icon: IconPalette, color: 'grape'},
    {key: 'LIBRARY', icon: IconBook, color: 'orange'},
] as const;

export function FacilitiesSection() {
    const t = useTranslations('FACILITIES');

    return (
        <Container size="full" className={commonClasses.darkerBackground}>
            <Container size="lg" pt={50} pb={55}>
                <TitleWithDescription title={t('TITLE')}/>

                <Divider mb="xl" color="transparent"/>

                <SimpleGrid cols={{base: 1, sm: 2, md: 3}} spacing="xl">
                    {facilities.map(({key, icon: Icon, color}) => (
                        <Card key={key} shadow="md" radius="md" padding="xl" className={classes.card}>
                            <ThemeIcon size={rem(50)} radius="md" variant="light" color={color}>
                                <Icon style={{width: rem(28), height: rem(28)}} stroke={1.5}/>
                            </ThemeIcon>
                            <Text fz="lg" fw={600} mt="md">
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
