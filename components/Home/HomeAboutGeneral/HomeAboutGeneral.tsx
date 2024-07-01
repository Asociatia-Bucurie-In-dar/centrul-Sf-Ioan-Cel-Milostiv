import classes from './HomeAboutGeneral.module.css';
import {Container, Avatar, Title, Text, Divider, Center, Image, rem} from "@mantine/core";
import {useTranslations} from "next-intl";

export function HomeAboutGeneral() {
    const t = useTranslations('HOME_POTENTIAL');
    return <>
        <Container size="lg" mt={35} mb={45} className={classes.wrapper}>
                    <div className={classes.body}>
                        <Center>
                        <Title className={classes.titleBig} >
                            {t('TITLE')}
                        </Title>
                        </Center>
                        
                        <Center>
                        <Text fz="md" c="customDimmed" style={{textAlign: "center"}}>
                            {t('DESCRIPTION')}
                        </Text>
                        </Center>
                    </div>
                <Center>
                    <div className={classes.roundedImageWrapper}>
                        <Image src="/portret.png" alt={t('IMAGE_ALT')} width={rem(250)} height={rem(250)}/>
                    </div>
                </Center>
        </Container>
    </>;
}