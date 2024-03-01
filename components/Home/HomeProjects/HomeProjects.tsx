
import classes from './HomeProjects.module.css';
import { ProjectPreviewCardsSlider } from '@/components/Projects/ProjectPreviewCardsSlider';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {Center, Container, Divider, Group} from "@mantine/core";
import {ConfettiButton} from "@/components/ConfettiButton/ConfettiButton";
import commonClasses from "@/utils/commonClasses.module.css";
import {useTranslations} from "next-intl";

export function HomeProjects() {
    const t = useTranslations('PROJECTS');
    
    return (
        <Container size="full" className={commonClasses.darkerBackground} pt="sm" pb="sm">
            
            <Divider mt="xl" color="transparent" />
            
            <TitleWithDescription title={t('TITLE')}
                                  description={t('DESCRIPTION')} />

            <Divider mb={45} color="transparent" />
            
            <ProjectPreviewCardsSlider amount={6}/>
    
            {/*<Group justify="center" mt="xl" mb={52}>*/}
            {/*    <ConfettiButton text={"Vezi toate proiectele"} size="md"/>*/}
            {/*</Group>*/}
            <Divider mb="xl" color="transparent"/>
        </Container>
    );
}