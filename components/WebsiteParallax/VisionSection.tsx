import {Container, Title, Text, List, ListItem, ThemeIcon, Divider, rem, Image} from '@mantine/core';
import commonClasses from '@/utils/commonClasses.module.css';
import {useTranslations} from "next-intl";
import classes from './VisionSection.module.css';
import {IconCheck} from '@tabler/icons-react';

const pointKeys = ['1', '2', '3', '4', '5'] as const;

export function VisionSection() {
    const t = useTranslations('VISION');

    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <Image
                    src="/new/4.webp"
                    alt="Vision"
                    style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute'}}
                />
            </div>
            <div className={classes.overlay}/>
            <Container size="md" className={classes.content} pt={60} pb={65}>
                <Title order={2} className={commonClasses.titleBig} ta="center" c="white" style={{maxWidth: rem(600), margin: 'auto'}}>
                    {t('TITLE')}
                </Title>

                <Text c="white" ta="center" mt="md" fw={500} style={{maxWidth: rem(600), margin: 'auto'}}>
                    {t('DESCRIPTION')}
                </Text>

                <Divider mb="xl" color="transparent"/>

                <List spacing="lg" center className={classes.list}>
                    {pointKeys.map((key) => (
                        <ListItem
                            key={key}
                            icon={
                                <ThemeIcon color="green" size={28} radius="xl">
                                    <IconCheck style={{width: rem(18), height: rem(18)}}/>
                                </ThemeIcon>
                            }
                        >
                            <Text c="white" fw={500} fz="md">
                                {t(`POINTS.${key}`)}
                            </Text>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    );
}
