import {Container, Text, Divider, Paper, Anchor, List, ListItem, ThemeIcon, rem} from '@mantine/core';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";
import commonClasses from '@/utils/commonClasses.module.css';
import classes from './ImpactSection.module.css';
import {IconExternalLink, IconCircleCheck} from '@tabler/icons-react';

const standards = [
    {
        key: 'SEEQ',
        href: 'https://www.sciencedirect.com/science/article/pii/S0740547298000361',
    },
    {
        key: 'EFTC',
        href: 'https://www.dianova.org/wp-content/uploads/2016/09/service-standards-for-addiction-therapeutic-communities.pdf',
    },
    {
        key: 'WFTC',
        href: 'https://www.wftc.org/membership-standards',
    },
] as const;

export function ImpactSection() {
    const t = useTranslations('IMPACT');

    return (
        <Container size="full" className={commonClasses.darkerBackground}>
            <Container size="md" pt={50} pb={55}>
                <TitleWithDescription title={t('TITLE')}/>

                <Text c="customDimmed" ta="center" mt="md" fw={500} style={{maxWidth: rem(700), margin: 'auto'}}>
                    {t('DESCRIPTION')}
                </Text>

                <Divider mb="xl" color="transparent"/>

                <Paper shadow="md" radius="md" p="xl" className={classes.paper}>
                    <List spacing="lg" center>
                        {standards.map(({key, href}) => (
                            <ListItem
                                key={key}
                                icon={
                                    <ThemeIcon color="green" size={24} radius="xl">
                                        <IconCircleCheck style={{width: rem(16), height: rem(16)}}/>
                                    </ThemeIcon>
                                }
                            >
                                <Anchor href={href} target="_blank" rel="noopener noreferrer" fw={500}>
                                    {t(`STANDARDS.${key}`)} <IconExternalLink size={14} style={{verticalAlign: 'middle'}}/>
                                </Anchor>
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                <Divider mt="xl" color="transparent"/>

                <Text ta="center" fz="lg" fw={600} c="customDimmed">
                    {t('FOOTER')}
                </Text>
            </Container>
        </Container>
    );
}
