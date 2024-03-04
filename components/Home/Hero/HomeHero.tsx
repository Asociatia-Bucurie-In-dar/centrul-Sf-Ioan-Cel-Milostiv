import { Container, Title, Text, Button, Image } from '@mantine/core';
import classes from './HomeHero.module.css';
import { ConfettiButton } from '@/components/ConfettiButton/ConfettiButton';
import {useTranslations} from "next-intl";

export function HomeHero() {
    const commonT = useTranslations('COMMON');
    const heroT = useTranslations('HOME_HERO');
    
    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <Image
                    src="/center.png"
                    alt={"Background"}
                    style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%', position: 'absolute'}}
                    fetchPriority="auto" />
            </div>
            <div className={classes.overlay}></div>
            <Container size="lg">
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            {heroT('MOTTO_FIRST_PART')} <br/>
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{from: 'pink', to: 'yellow'}}
                            >
                                {' '}{heroT('MOTTO_SECOND_PART')}.{' '}
                            </Text>
                        </Title>

                        <Text className={classes.description} mt={30}>
                            {heroT('DESCRIPTION')} <br/>
                        </Text>
                        <ConfettiButton size={"lg"} mt="xl" text={commonT('DONATE_NOW')}/>
                    </div>
                </div>
            </Container>
        </div>
    );
}