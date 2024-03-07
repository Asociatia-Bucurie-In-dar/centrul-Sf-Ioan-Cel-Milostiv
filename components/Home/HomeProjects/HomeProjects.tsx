import classes from './HomeProjects.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Card, Center, Container, Divider, Group, rem, SimpleGrid, Text} from "@mantine/core";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import commonClasses from "@/utils/commonClasses.module.css";
import {useTranslations} from "next-intl";
import {ProjectPreviewCard} from "@/components/Projects/ProjectPreviewCard";

const data = [
    {
        title: 'test1',
        imgPath: '/faq.svg',
        texts: [
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
        ]
    },
    {
        title: 'test2',
        imgPath: '/faq.svg',
        texts: [
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
        ]
    },
    {
        title: 'test3',
        imgPath: '/faq.svg',
        texts: [
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
        ]
    },
    {
        title: 'test2',
        imgPath: '/faq.svg',
        texts: [
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
            'test text asd',
        ]
    },
];

export function HomeProjects() {
    const t = useTranslations('PROJECTS');

    const cards = data.map((info) => (
        <ProjectPreviewCard title={info.title} imgPath={info.imgPath} texts={info.texts} />
    ));
    
    return (
        <Container size="full" className={commonClasses.darkerBackground} pt="sm" pb="sm">
            
            <Divider mt="xl" color="transparent" />
            
            <TitleWithDescription title={t('TITLE')}
                                  description={t('DESCRIPTION')} />

            <Divider mb={45} color="transparent" />

            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mt={50}>
                {cards}
            </SimpleGrid>
            
            <Divider mb="xl" color="transparent"/>
        </Container>
    );
}