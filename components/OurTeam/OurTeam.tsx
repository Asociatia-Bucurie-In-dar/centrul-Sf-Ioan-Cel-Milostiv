import {Avatar, Button, Card, Center, Container, Divider, SimpleGrid, Text, Title} from '@mantine/core';
import {IconArrowRight} from '@tabler/icons-react';
import classes from './OurTeam.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import commonClasses from "@/utils/commonClasses.module.css";
import {Link} from "@/navigation";
import {teamGroups, TeamMember} from "@/content/team/team-members";
import {MyRoutePaths} from "@/utils/route-paths";

// Home page version: photo, name and role only, with a link to the full team page.
export function OurTeam() {
    const t = useTranslations('OUR_TEAM');
    const members = teamGroups.flatMap((group) => group.members);

    return (
        <Container pt={40} pb={55} size="full" className={commonClasses.darkerBackground}>
            <Container size="lg">
                <TitleWithDescription title={t('TITLE')} description={t('SHORT_DESCRIPTION')} maxWidth="800px"/>

                <Divider mt="xl" mb="sm" color="transparent"/>

                <SimpleGrid cols={{base: 2, sm: 3, md: 5}} spacing="lg" verticalSpacing="xl">
                    {members.map((member) => (
                        <div key={member.key} className={classes.compactMember}>
                            <Avatar size={110} src={member.avatar} radius={8} mx="auto"
                                    alt={t(`TEAM_MEMBERS.${member.key}.NAME`)}/>
                            <Text fz="sm" fw={700} mt="sm">{t(`TEAM_MEMBERS.${member.key}.NAME`)}</Text>
                            <Text fz="xs" fw={500} className={classes.cardTitle}>{t(`TEAM_MEMBERS.${member.key}.ROLE`)}</Text>
                        </div>
                    ))}
                </SimpleGrid>

                <Center mt={40}>
                    <Link href={MyRoutePaths.Team}>
                        <Button component="span" size="md" variant="light" fw={600}
                                rightSection={<IconArrowRight size={18}/>}>
                            {t('SEE_TEAM')}
                        </Button>
                    </Link>
                </Center>
            </Container>
        </Container>
    );
}

function MemberCard({member}: {member: TeamMember}) {
    const t = useTranslations('OUR_TEAM');
    const name = t(`TEAM_MEMBERS.${member.key}.NAME`);
    const role = t(`TEAM_MEMBERS.${member.key}.ROLE`);

    return (
        <Card shadow="md" radius="md" className={classes.card} padding="xl">
            <Avatar size={140} src={member.avatar} radius={8} alt={name + ' ' + role}/>
            <Text fz="lg" fw={600} mt="md">{name}</Text>
            <Text fz="md" fw={400} className={classes.cardTitle}>{role}</Text>
            <Divider mt="sm" mb={0}/>
            <Text fz="sm" c="customDimmed" mt="sm" fw={500}>
                {t(`TEAM_MEMBERS.${member.key}.DESCRIPTION`)}
            </Text>
        </Card>
    );
}

// Team page version: full bios, split by group.
export function TeamDetails() {
    const t = useTranslations('OUR_TEAM');

    return (
        <Container size="lg">
            <TitleWithDescription title={t('TITLE')} description={t('DESCRIPTION')} maxWidth="1000px"/>

            {teamGroups.map((group) => (
                <section key={group.key}>
                    <Title order={3} mt={60} mb="lg" ta="center">{t(`GROUPS.${group.key}`)}</Title>
                    <SimpleGrid cols={{base: 1, md: 2, lg: 3}} spacing="lg" verticalSpacing="lg">
                        {group.members.map((member) => <MemberCard key={member.key} member={member}/>)}
                    </SimpleGrid>
                </section>
            ))}
        </Container>
    );
}
