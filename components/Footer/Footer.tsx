import {Text, Container, ActionIcon, Group, rem, Title, Center, SimpleGrid, Divider} from '@mantine/core';
import classes from './Footer.module.css';
import Link from "next/link";
import {useTranslations} from "next-intl";

export function Footer() {
    const commonT = useTranslations('COMMON');
    const heroT = useTranslations('HOME_HERO');
    
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner} size="lg">
                <div className={classes.logo}>
                    <Title className={classes.title} size={18} mb="xs">
                        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                            <Link href="/">
                                {commonT('ASSOCIATION_FULL')}
                            </Link>
                        </Text>
                    </Title>
                    <Text size="xs" c="dimmed" className={classes.description}>
                        {heroT('MOTTO_FIRST_PART')}{' '}{heroT('MOTTO_SECOND_PART')}.
                    </Text>
                </div>
            </Container>
            <Divider color="transparent" mb="lg" />
            
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    © {new Date().getFullYear()} {commonT('ASSOCIATION_FULL')}
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    
                </Group>
            </Container>
        </footer>
    );
}