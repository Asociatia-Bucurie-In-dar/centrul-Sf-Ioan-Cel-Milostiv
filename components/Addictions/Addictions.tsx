'use client';

import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Title, useMantineTheme, Image, Container, Text,
    Divider,
    rem,
    Button,
    HoverCard,
    Group
} from '@mantine/core';
import classes from './Addictions.module.css';
import Autoplay from 'embla-carousel-autoplay';
import {useRef} from "react";
import {TitleWithDescription} from "@/components/Common/TitleWithDescription";
import commonClasses from "@/utils/commonClasses.module.css";

interface CardProps {
    image: string;
    title: string;
    description: string;
    readMoreTranslation: string;
}

function Card({ image, title, description, readMoreTranslation }: CardProps) {
    return (
        <div>
            <div className={classes.background}>
                <Image
                    src={image}
                    alt={title}
                    fetchPriority="auto"
                    style={{height: '100%'}}/>
                <div className={classes.overlay}></div>
            </div>
            <Paper
                shadow="md"
                p="xl"
                radius="md"
                className={classes.card}
            >
                <div style={{zIndex:1}}>
                    <Title order={3} className={classes.title} style={{height:rem('150px')}}>
                        {title}
                    </Title>
                </div>
                
                <div style={{zIndex:1, marginBottom:rem('20px')}}>
                    <Text size="md" c="white" lineClamp={3} fz="md" fw="500" className={classes.description}
                          style={{bottom:'0'}}>
                        {description}
                    </Text>

                    <Divider color="transparent" mb="sm" />

                    <Group justify="start">
                        <HoverCard width={280} shadow="md">
                            
                    <HoverCard.Target>
                    <Button
                        variant="light"
                        color="green"
                        size="sm">
                        {readMoreTranslation}
                    </Button>
                    </HoverCard.Target>

                    <HoverCard.Dropdown>
                        <Text size="sm" fw={500}>
                            {description}
                        </Text>
                    </HoverCard.Dropdown>
                            
                        </HoverCard>
                    </Group>
                    
                </div>
            </Paper>
        </div>
    );
}

export function Addictions(props: { translations:any }) {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const slides = props.translations.slidesData.map((item:any) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} readMoreTranslation={props.translations.readMoreTranslation}/>
        </Carousel.Slide>
    ));
    const autoplay = useRef(Autoplay({ delay: 2000 }));

    return (
        <Container size="full" className={commonClasses.darkerBackground} pb={60} pt={45}>
        <Container size="xl">
            <TitleWithDescription title={props.translations.title}  
                                  description={props.translations.description} maxWidth={rem('700px')}/>
            
            <Divider color="transparent" mb="xl" />
            
        <Carousel withIndicators={true}
            slideSize={{ base: '100%', sm: 'calc(50% - 20px)', md: 'calc(33.333% - 20px)' }}
            slideGap={{ base: "sm", sm: 'xl' }}
            align="start"
                  loop
            slidesToScroll={1} draggable
                  withControls={true}
                  classNames={{
                      root: classes.carousel,
                      controls: classes.carouselControls,
                      indicator: classes.carouselIndicator,
                      control: classes.carouselControl,
                  }}
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={autoplay.current.reset}
                  
        >
            {slides}
        </Carousel>
        </Container>
        </Container>
    );
}