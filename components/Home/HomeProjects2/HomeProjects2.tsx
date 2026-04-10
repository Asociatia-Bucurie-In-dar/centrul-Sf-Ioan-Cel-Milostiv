import classes from './HomeProjects.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Container, Divider, SimpleGrid} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {useTranslations} from "next-intl";
import {ProjectPreviewCard} from "@/components/Projects/ProjectPreviewCard";

export function HomeProjects2() {
    const t = useTranslations('TRANSFORMATION_STEPS');

    const images = ["/base/flower1.jpg", "/base/flower3.jpg", "/base/flower6.jpg", "/base/flower8.jpg"];

    const data = images.map((imgPath, i) => ({
        title: t(`STEPS.${i}.TITLE`),
        imgPath,
        texts: [t(`STEPS.${i}.TEXTS.0`), t(`STEPS.${i}.TEXTS.1`)],
    }));

    const cards = data.map((info) => (
        <ProjectPreviewCard title={info.title} imgPath={info.imgPath} texts={info.texts} />
    ));
    
    return (
        <Container size="full" pt={10} pb="sm">
            
            <Divider mt="xl" color="transparent" />
            
            <TitleWithDescription title={t('TITLE')}
                                  description={""} maxWidth="1100px" />

            <Divider mb={45} color="transparent" />

            <Container size="lg">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 2 }} spacing="xl" mt={50}>
                {cards[0]}
                {cards[1]}
                {cards[2]}
                {cards[3]}
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