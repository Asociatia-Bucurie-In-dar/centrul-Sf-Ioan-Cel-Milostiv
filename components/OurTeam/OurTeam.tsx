import {Avatar, Container, Divider, Group, rem, SimpleGrid, Text, Title} from '@mantine/core';
import classes from './OurTeam.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import commonClasses from "@/utils/commonClasses.module.css";

export function OurTeam() {
    const t = useTranslations('OUR_TEAM');

    const data = [
        {
            avatar: '/team/1.png',
            name: t('TEAM_MEMBERS.FIRST.NAME'),
            job: t('TEAM_MEMBERS.FIRST.ROLE'),
        },
        {
            avatar: '/team/2.png',
            name: t('TEAM_MEMBERS.SECOND.NAME'),
            job: t('TEAM_MEMBERS.SECOND.ROLE'),
        },
        {
            avatar: '/team/4.png',
            name: t('TEAM_MEMBERS.THIRD.NAME'),
            job: t('TEAM_MEMBERS.THIRD.ROLE'),
        },
        {
            avatar: '/team/6.png',
            name: t('TEAM_MEMBERS.FOURTH.NAME'),
            job: t('TEAM_MEMBERS.FOURTH.ROLE'),
        },
        {
            avatar: '/team/8.png',
            name: t('TEAM_MEMBERS.FIFTH.NAME'),
            job: t('TEAM_MEMBERS.FIFTH.ROLE'),
        },
        {
            avatar: '/team/3.png',
            name: t('TEAM_MEMBERS.SIXTH.NAME'),
            job: t('TEAM_MEMBERS.SIXTH.ROLE'),
        },
        {
            avatar: '/team/7.png',
            name: t('TEAM_MEMBERS.SEVENTH.NAME'),
            job: t('TEAM_MEMBERS.SEVENTH.ROLE'),
        },
        {
            avatar: '/team/5.png',
            name: t('TEAM_MEMBERS.EIGHTH.NAME'),
            job: t('TEAM_MEMBERS.EIGHTH.ROLE'),
        },
        {
            avatar: '/team/6.jpeg',
            name: t('TEAM_MEMBERS.NINTH.NAME'),
            job: t('TEAM_MEMBERS.NINTH.ROLE'),
        },
        {
            avatar: '/team/7.jpg',
            name: t('TEAM_MEMBERS.TENTH.NAME'),
            job: t('TEAM_MEMBERS.TENTH.ROLE'),
        }
    ];

    const items = data.map((item) => {
        return <Group gap="xl" key={item.avatar}>
            <Avatar size="xl" src={item.avatar} radius={40} alt={item.name + " " + item.job}/>
            <br/>
            <div>
                <Title fz="md" fw={500}>
                    {item.name}
                </Title>
                <Text c="customDimmed" fz="md" fw={500}>
                    {item.job}
                </Text>
            </div>
        </Group>
    });

    return (
        <Container pt={40} pb={55} size="full" className={commonClasses.darkerBackground}>
            <Container size="lg">

                <TitleWithDescription title={t('TITLE')}
                                      description={t('DESCRIPTION')} maxWidth="1000px"/>

                <Divider mt="xl" mb="sm" color="transparent" />

                <SimpleGrid
                    cols={{ base: 2, sm: 5, md: 5 }}
                    spacing={{ base: 'xl', md: 50 }}
                    verticalSpacing={{ base: 'xl', md: 50 }} className={classes.grid}
                >
                    {items}
                </SimpleGrid>
            </Container>
        </Container>
    );
}