import classes from './HomeProjects.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Container, Divider, SimpleGrid} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {useTranslations} from "next-intl";
import {ProjectPreviewCard} from "@/components/Projects/ProjectPreviewCard";

export function HomeProjects() {
    const t = useTranslations('ORGANIZATON');

    const data = [
        {
            title: t('CATEGORIES.0.TITLE'),
            imgPath: '/base/call.jpeg',
            texts: [
                t('CATEGORIES.0.TEXTS.0'),
                t('CATEGORIES.0.TEXTS.1'),
                t('CATEGORIES.0.TEXTS.2'),
                t('CATEGORIES.0.TEXTS.3'),
                t('CATEGORIES.0.TEXTS.4'),
            ]
        },
        {
            title: t('CATEGORIES.1.TITLE'),
            imgPath: '/base/ambulance.jpg',
            texts: [
                t('CATEGORIES.1.TEXTS.0'),
                t('CATEGORIES.1.TEXTS.1'),
                t('CATEGORIES.1.TEXTS.2'),
                t('CATEGORIES.1.TEXTS.3'),
            ]
        },
        {
            title: t('CATEGORIES.2.TITLE'),
            imgPath: '/base/psych.jpeg',
            texts: [
                t('CATEGORIES.2.TEXTS.0'),
                t('CATEGORIES.2.TEXTS.1'),
                t('CATEGORIES.2.TEXTS.2'),
                t('CATEGORIES.2.TEXTS.3'),
                t('CATEGORIES.2.TEXTS.4'),
                t('CATEGORIES.2.TEXTS.5'),
            ]
        },
        {
            title: t('CATEGORIES.3.TITLE'),
            imgPath: '/base/2.jpeg',
            texts: [
                t('CATEGORIES.3.TEXTS.0'),
                t('CATEGORIES.3.TEXTS.1'),
                t('CATEGORIES.3.TEXTS.2')
            ]
        },
    ];

    const cards = data.map((info) => (
        <ProjectPreviewCard title={info.title} imgPath={info.imgPath} texts={info.texts} />
    ));
    
    return (
        <Container size="full" pt={10} pb="sm">
            
            <Divider mt="xl" color="transparent" />
            
            <TitleWithDescription title={t('TITLE')}
                                  description={t('DESCRIPTION')} />

            <Divider mb={45} color="transparent" />

            <Container size="lg">
            <SimpleGrid cols={{ base: 1, sm: 1, md: 3 }} spacing="xl" mt={50}>
                {cards[0]}
                {cards[1]}
                {cards[2]}
            </SimpleGrid>
            </Container>

            {/*<Container size="md">*/}
            {/*<SimpleGrid cols={{ base: 1, sm: 1, md: 1 }} spacing="xl" mt={50}>*/}
            {/*    {cards[3]}*/}
            {/*</SimpleGrid>*/}
            {/*</Container>*/}
            
            <Divider mb={45} color="transparent"/>
        </Container>
    );
}