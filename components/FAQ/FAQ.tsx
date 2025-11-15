
import {
    Image,
    Accordion,
    AccordionItem,
    Grid,
    Container,
    GridCol,
    Center,
    AccordionControl,
    AccordionPanel
} from '@mantine/core';
import classes from './FAQ.module.css';
import commonClasses from '@/utils/commonClasses.module.css';
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import {useTranslations} from "next-intl";


export function FAQ() {
    const t = useTranslations('FAQ');

    const questions = [
        {
            question: t('QUESTIONS.FIRST.QUESTION'),
            answer: t('QUESTIONS.FIRST.ANSWER'),
        },
        {
            question: t('QUESTIONS.SECOND.QUESTION'),
            answer: t('QUESTIONS.SECOND.ANSWER'),
        },
        {
            question: t('QUESTIONS.THIRD.QUESTION'),
            answer: t('QUESTIONS.THIRD.ANSWER'),
        },
        {
            question: t('QUESTIONS.FOURTH.QUESTION'),
            answer: t('QUESTIONS.FOURTH.ANSWER'),
        }];

    const items = questions.map((item) => (
        <AccordionItem className={classes.item} value={item.question} key={item.question}>
            <AccordionControl className={classes.question}>{item.question}</AccordionControl>
            <AccordionPanel>{item.answer}</AccordionPanel>
        </AccordionItem>
    ));
    
    return (
        <Container className={commonClasses.darkerBackground} size="full">
            <Container size="lg" className={classes.wrapper}>
                <Grid id="faq-grid" gutter={50}>
                    <GridCol span={{ base: 12, md: 6 }}>
                        
                        <Image src="/faq.svg" alt={t('TITLE')} 
                            loading="lazy"/>
                       
                    </GridCol>
                    <GridCol span={{ base: 12, md: 6 }}>
                        
                        <TitleWithDescription title={t('TITLE')} description={""} />

                        <Accordion chevronPosition="right" variant="separated" defaultValue={questions[0].question}>
                            {items}
                        </Accordion>
                    </GridCol>
                </Grid>
            </Container>
        </Container>
    );
}