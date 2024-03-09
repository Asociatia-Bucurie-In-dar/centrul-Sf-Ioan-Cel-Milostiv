import { Badge, Group, Title,
    Text,
    Card,
    SimpleGrid,
    Container,
    rem, DEFAULT_THEME, Divider,
} from '@mantine/core';
import {IconBasketHeart, IconUsersGroup, IconSword, IconHeart} from '@tabler/icons-react';
import classes from './HomeAboutProjects.module.css';
import commonClasses from '@/utils/commonClasses.module.css';
import Link from "next/link";
import {MyRoutePaths} from "@/utils/route-paths";
import {useTranslations} from "next-intl";

export function HomeAboutProjects() {
    const t = useTranslations('HOME_HELP');
    const commonT = useTranslations('COMMON');

    const data = [
        {
            title: t('FIRST.TITLE'),
            description: t('FIRST.DESCRIPTION'),
            icon: IconUsersGroup,
        },
        {
            title: t('SECOND.TITLE'),
            description: t('SECOND.DESCRIPTION'),
            icon: IconHeart,
        },
        {
            title: t('THIRD.TITLE'),
            description: t('THIRD.DESCRIPTION'),
            icon: IconSword,
        },
    ];
    
    const iconColor = DEFAULT_THEME.colors.green[6];
    const badgeColor = DEFAULT_THEME.colors.green[6];
    
    const features = data.map((feature) => (
        <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
            <feature.icon
                style={{ width: rem(50), height: rem(50) }}
                stroke={2}
                color={iconColor}
            />
            <Text fz="lg" fw={600} className={classes.cardTitle} mt="md">
                {feature.title}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
                {feature.description}
            </Text>
        </Card>
    ));

    return (
<Container size="full" py="xl" >
        <Container size="lg" mt="md">
            

            <Title order={2} className={classes.title} ta="center" mt="sm">
                {commonT('ASSOCIATION_FULL')}
            </Title>

            <Text c="dimmed" className={classes.description} ta="center" mt="md">
                {t('DESCRIPTION')}
            </Text>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {features}
            </SimpleGrid>
        </Container>
    
    <Divider color="transparent" mb="md"/>
    
</Container>
    );
}