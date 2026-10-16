import {Container, Title, Text, Button, Image, Divider, Group} from '@mantine/core';
import classes from './HomeHero.module.css';
import {useTranslations} from "next-intl";
import {TeleportButton} from "@/components/CoolEffects/TeleportButton/TeleportButton";
import {IconFileTypePdf} from "@tabler/icons-react";
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
import {GetAllProjectsStaticContent} from "@/content/projects/projects-content";
import {useDonatePopupTranslations} from "@/utils/donate-translations";

export function HomeHero() {
    const commonT = useTranslations('COMMON');
    const heroT = useTranslations('HOME_HERO');
    const projT = useTranslations('SAINT_JOHN');
    const donateTranslations = useDonatePopupTranslations();
    const proj = GetAllProjectsStaticContent(1)[0];
    
    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <Image
                    src="/hero.jpeg"
                    alt={"Background"}
                    style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute'}}
                    fetchPriority="auto"/>
            </div>
            <div className={classes.overlay}></div>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            {/*{heroT('MOTTO_FIRST_PART')} <br/>*/}
                            {heroT('MOTTO_1')}<br/>
                            {heroT('MOTTO_2')}, <br/>
                            {heroT('MOTTO_3')}, <br/>
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{from: 'pink', to: 'yellow'}}
                            >
                                {heroT('MOTTO_4')}!
                            </Text>
                        </Title>
                        
                        <Text className={classes.description} mt={30} style={{maxWidth: '700px'}}>
                            <b>{heroT('DESCRIPTION')}</b>
                        </Text>
                        <Text className={classes.description} mt="xs" style={{maxWidth: '600px'}}>
                            {heroT('DESCRIPTION_2')} <br/>
                        </Text>
                        
                        {/*<ConfettiButton size={"lg"} mt="xl" text={commonT('DONATE_NOW')}/>*/}
                        {/*<Divider color="transparent" mt="xl"/>*/}
                        {/*<TeleportButton targetID="progressSection" text={heroT('SEE_MORE')} size="md"/>*/}
                        <Divider color="transparent" mt="xl"/>
                        <Group gap="md">
                            <DonatePopupButton projectId={proj.id}
                                               projectTile={projT('TITLE')}
                                               size="lg"
                                               translations={donateTranslations}/>
                            <Button
                                component="a"
                                href="/info2.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="white"
                                size="lg"
                                fw={600}
                                rightSection={<IconFileTypePdf size={18} />}
                            >
                                {heroT('INFO')}
                            </Button>
                        </Group>
                    </div>
                </div>
            </Container>
        </div>
    );
}