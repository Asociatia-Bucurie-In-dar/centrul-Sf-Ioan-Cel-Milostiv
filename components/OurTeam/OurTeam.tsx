import {Avatar, Card, Container, Divider, SimpleGrid, Text, Title} from '@mantine/core';
import classes from './OurTeam.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import commonClasses from "@/utils/commonClasses.module.css";

export function OurTeam() {
    const t = useTranslations('OUR_TEAM');

    const data = [
        {
            avatar: '/team/alex.jpeg',
            name: t('TEAM_MEMBERS.FIRST.NAME'),
            job: t('TEAM_MEMBERS.FIRST.ROLE'),
            description: t('TEAM_MEMBERS.FIRST.DESCRIPTION'),
        },
        {
            avatar: '/team/catalin.jpeg',
            name: t('TEAM_MEMBERS.MARIUS.NAME'),
            job: t('TEAM_MEMBERS.MARIUS.ROLE'),
            description: t('TEAM_MEMBERS.MARIUS.DESCRIPTION'),
        },
                {
            avatar: '/team/3.jpeg',
            name: t('TEAM_MEMBERS.PITIGOI.NAME'),
            job: t('TEAM_MEMBERS.PITIGOI.ROLE'),
            description: t('TEAM_MEMBERS.PITIGOI.DESCRIPTION'),
        },
        {
            avatar: '/team/2.jpeg',
            name: t('TEAM_MEMBERS.SECOND.NAME'),
            job: t('TEAM_MEMBERS.SECOND.ROLE'),
            description: t('TEAM_MEMBERS.SECOND.DESCRIPTION'),
        },
        {
            avatar: '/team/4.jpeg',
            name: t('TEAM_MEMBERS.FOURTH.NAME'),
            job: t('TEAM_MEMBERS.FOURTH.ROLE'),
            description: t('TEAM_MEMBERS.FOURTH.DESCRIPTION'),
        },
        {
            avatar: '/team/arhitectura.jpeg',
            name: t('TEAM_MEMBERS.FIFTH.NAME'),
            job: t('TEAM_MEMBERS.FIFTH.ROLE'),
            description: t('TEAM_MEMBERS.FIFTH.DESCRIPTION'),
        },
        {
            avatar: '/team/anabanica.jpeg',
            name: t('TEAM_MEMBERS.SEVENTH.NAME'),
            job: t('TEAM_MEMBERS.SEVENTH.ROLE'),
            description: t('TEAM_MEMBERS.SEVENTH.DESCRIPTION'),
        },
        {
            avatar: '/team/anazaharia.jpeg',
            name: t('TEAM_MEMBERS.EIGHTH.NAME'),
            job: t('TEAM_MEMBERS.EIGHTH.ROLE'),
            description: t('TEAM_MEMBERS.EIGHTH.DESCRIPTION'),
        },
        {
            avatar: '/team/constantin.jpeg',
            name: t('TEAM_MEMBERS.ELEVENTH.NAME'),
            job: t('TEAM_MEMBERS.ELEVENTH.ROLE'),
            description: t('TEAM_MEMBERS.ELEVENTH.DESCRIPTION'),
        },
        {
            avatar: '/team/7.jpg',
            name: t('TEAM_MEMBERS.TENTH.NAME'),
            job: t('TEAM_MEMBERS.TENTH.ROLE'),
            description: t('TEAM_MEMBERS.TENTH.DESCRIPTION'),
        }
    ];

    const items = data.map((item) => {
        return (
            // <Card
            //     key={item.name}
            //     padding="md"
            //     radius="md"
            //     shadow="sm"
            //     withBorder
            //     className={classes.memberCard}
            //     style={{ display: 'flex', alignItems: 'flex-start' }}
            // >
            //     <Avatar size={140} src={item.avatar} radius={12} alt={item.name + ' ' + item.job} />
            //     <div style={{ marginLeft: 16, flex: 1 }}>
            //         <Title fz="md" fw={600}>{item.name}</Title>
            //         <Text c="customDimmed" fz="sm" fw={500} style={{ marginTop: 4 }}>{item.job}</Text>
            //         <Text c="dimmed" fz="sm" style={{ marginTop: 8 }}>{item.description}</Text>
            //     </div>
            // </Card>
            <Card key={item.name} shadow="md" radius="md" className={classes.card} padding="xl">
            <Avatar size={140} src={item.avatar} radius={8} alt={item.name + ' ' + item.job} />
            <Text fz="lg" fw={600} mt="md">
                {item.name}
            </Text>
            <Text fz="md" fw={400} className={classes.cardTitle}>
                {item.job}
            </Text>
            <Divider mt="sm" mb={0} />
            <Text fz="sm" c="customDimmed" mt="sm" fw={500}>
                {item.description}
            </Text>
        </Card>
        )
    });

    return (
        <Container pt={40} pb={55} size="full" className={commonClasses.darkerBackground}>
            <Container size="lg">

                <TitleWithDescription title={t('TITLE')}
                                      description={t('DESCRIPTION')} maxWidth="1000px"/>

                <Divider mt="xl" mb="sm" color="transparent" />

                <SimpleGrid
                    cols={{ base: 1, sm: 1, md: 2, lg: 3 }}
                    spacing="lg"
                    verticalSpacing="lg"
                    className={classes.grid}
                >
                    {items}
                </SimpleGrid>
            </Container>
        </Container>
    );
}