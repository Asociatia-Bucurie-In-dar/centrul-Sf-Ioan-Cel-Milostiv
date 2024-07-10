import commonClasses from "@/utils/commonClasses.module.css";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Center, Container, Divider, Image, SimpleGrid, Stack, Text, Title} from "@mantine/core";
import {useTranslations} from "next-intl";

const spacing = "xl";
const division = 75;
const cols = { base: 1, sm: 2, md: 2, lg: 2, xl: 2 };
export function HomeWhy() {

    const t = useTranslations('HOME_WHY');

    const roundedImage = (src: string) => {
        return (
            <div style={{borderRadius: '10px', overflow: 'hidden'}}>
                <Image src={src}/>
            </div>
        );
    }

    return (
        <Container size="full" className={commonClasses.darkerBackground}>
                <Container size="lg" pt={45} pb={50}>
                    <TitleWithDescription title={t('TITLE')} />
                    
                    <Divider mb="xl" color="transparent" />

                    {/* FIRST */}
                    <SimpleGrid cols={cols} spacing={spacing}>
                        <Center>
                            {roundedImage("/faq.svg")}
                        </Center>

                        <Center>
                            <Stack>
                                <Title fz={30} ta="center">{t('FIRST_TITLE')}</Title>
                                <Text c="customDimmed" fw={500}>
                                    {t('FIRST_DESCRIPTION')}
                                </Text>
                            </Stack>
                        </Center>
                    </SimpleGrid>

                    <Divider color="transparent" mb="lg"/>

                    {/* SECOND */}
                    <SimpleGrid cols={cols} spacing={spacing}>
                        <Center>
                            <Stack>
                                <Title fz={30} ta="center">{t('SECOND_TITLE')}</Title>
                                <Text c="customDimmed" fw={500}>
                                    {t('SECOND_DESCRIPTION')}
                                </Text>
                            </Stack>
                        </Center>

                        <Center>
                            {roundedImage("/faq.svg")}
                        </Center>
                    </SimpleGrid>
                    
                </Container>
        </Container>
    );
}
