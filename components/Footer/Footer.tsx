import {Text, Container, Group, Title, Center, SimpleGrid, Divider} from '@mantine/core';
import classes from './Footer.module.css';
import Link from "next/link";
import {useTranslations} from "next-intl";

export function Footer() {
    const t = useTranslations('HEADER');
    const commonT = useTranslations('COMMON');
    const heroT = useTranslations('HOME_HERO');

    function link(link: string, label: string) {
        return (
            <Text component={Link} href={link} c="customDimmed" size="sm" fw={500}>
                <Center>{label}</Center>
            </Text>
        );
    }
    
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
                    <Text size="xs" c="customDimmed" className={classes.description} fw={500}>
                        {heroT('MOTTO_FIRST_PART')}{' '}{heroT('MOTTO_SECOND_PART')}.
                    </Text>
                </div>
            </Container>
            <Divider color="transparent" mb="lg" />
            <Container size="md">
                <Center>
                    <SimpleGrid cols={2}>
                        {link(t('HOME.LINK'), t('HOME.LABEL'))}
                        {link(t('CONTACT.LINK'), t('CONTACT.LABEL'))}
                    </SimpleGrid>
                </Center>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="customDimmed" size="sm">
                    © {new Date().getFullYear()} {commonT('ASSOCIATION_FULL')}
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    
                </Group>
            </Container>
        </footer>
    );
}