import {Container, Title, Text, Button, Image, Divider} from '@mantine/core';
import classes from './HomeHero.module.css';
import {useTranslations} from "next-intl";
import {TeleportButton} from "@/components/CoolEffects/TeleportButton/TeleportButton";
import Link from "next/link";

export function HomeHero() {
    const commonT = useTranslations('COMMON');
    const heroT = useTranslations('HOME_HERO');
    
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
                        
                        <Text fw={600} c="white" mt={30} size="md" style={{opacity: 0.75}}>
                            {heroT('DESCRIPTION')} <br/><br/>
                        </Text>

                        <Text className={classes.description}>
                            {heroT('DESCRIPTION_2')}
                        </Text>
                        {/*<ConfettiButton size={"lg"} mt="xl" text={commonT('DONATE_NOW')}/>*/}
                        {/*<Divider color="transparent" mt="xl"/>*/}
                        {/*<TeleportButton targetID="progressSection" text={heroT('SEE_MORE')} size="md"/>*/}
                    </div>
                </div>
            </Container>
        </div>
    );
}