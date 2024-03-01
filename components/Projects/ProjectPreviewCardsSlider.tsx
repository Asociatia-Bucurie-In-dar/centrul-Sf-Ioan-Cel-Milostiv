import { SimpleGrid, Container } from '@mantine/core';
import {ProjectPreviewCard} from "@/components/Projects/ProjectPreviewCard";
import classes from './ProjectPreviewCardsSlider.module.css';
import {ProjectType} from "@/utils/my-types";
import {GetAllProjectsStaticContent} from "@/content/projects/projects-content";
import {useTranslations} from "next-intl";

export function ProjectPreviewCardsSlider(props: {amount: number}) {

    const projectsStaticContent: ProjectType[] = GetAllProjectsStaticContent(props.amount);
    const t = useTranslations('PROJECTS');
    
    const cards = projectsStaticContent.map((proj) => {
        const title = t(proj.translation_key + '.TITLE');
        const description = t(proj.translation_key + '.DESCRIPTION');
        return (
            <ProjectPreviewCard project={proj} title={title} description={description}/>
        );
    });

    return (
        <Container className={classes.container} size="lg">
            
            <SimpleGrid cols={{ base: 1, sm: 3, md: 3 }} spacing={45} verticalSpacing={45}>
                {cards}
            </SimpleGrid>
            
        </Container>
    );
}