import {Text, Container, Group, Title, Center, SimpleGrid, Divider} from '@mantine/core';
import classes from './Footer.module.css';
import {Link} from "@/navigation";
import {useTranslations} from "next-intl";

export function Footer() {
    const t = useTranslations('HEADER');
    const commonT = useTranslations('COMMON');
    const heroT = useTranslations('HOME_HERO');
    const saintJohnT = useTranslations('SAINT_JOHN');

    function link(href: string, label: string) {
        return (
            <Link href={href} style={{textDecoration: 'none'}}>
                <Text c="customDimmed" size="sm" fw={500}>
                    <Center>{label}</Center>
                </Text>
            </Link>
        );
    }
    
    return (
        <footer className={classes.footer}>
            <Container className={classes.inner} size="lg">
                <div className={classes.logo}>
                    <Title className={classes.title} size={18} mb="xs">
                        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                            <Link href="/">
                                {saintJohnT('TITLE')}
                            </Link>
                        </Text>
                    </Title>
                    <Text size="sm" c="customDimmed" className={classes.description} fw={500}>
                        {heroT('MOTTO_1')}{' '}{heroT('MOTTO_2')}, {heroT('MOTTO_3')}, {heroT('MOTTO_4')}!
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