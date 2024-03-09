import {Avatar, Container, Divider, Group, SimpleGrid, Text, Title} from '@mantine/core';
import classes from './OurTeam.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";

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
        }
    ];
    
    const items = data.map((item, index) => {
        return <Group gap="xl">
                <Avatar size="xl" src={item.avatar} radius={40} placeholder="blur" alt={item.name + " " + item.job}/>
            <br/>
                <div>
                    <Title fz="md" fw={500}>
                        {item.name}
                    </Title>
                    <Text c="dimmed" fz="sm">
                        {item.job}
                    </Text>
                </div>
        </Group>
    });
    
    return (
        <Container mt="lg" mb={55} size="lg">
            <Container className={classes.wrapper}>
                
                <TitleWithDescription title={t('TITLE')} 
                                      description={t('DESCRIPTION')}/>
                
                <Divider mt="xl" mb="sm" color="transparent" />
                
                <SimpleGrid
                    cols={{ base: 2, sm: 4, md: 4 }}
                    spacing={{ base: 'xl', md: 50 }}
                    verticalSpacing={{ base: 'xl', md: 50 }}
                >
                    {items}
                </SimpleGrid>
        </Container>
    </Container>
    );
}