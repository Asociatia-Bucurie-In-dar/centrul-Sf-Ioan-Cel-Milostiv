'use client';
import classes from './PlanCarousel.module.css';
import {Carousel} from "@mantine/carousel";
import {Button, Divider, Group, HoverCard, Image, Paper, rem, Text, Title} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {useRef} from "react";
import Autoplay from "embla-carousel-autoplay";

const images = [
    '/new/0.webp',
    '/new/1.webp',
    '/new/2.webp',
    '/new/3.webp',
    '/new/4.webp',
    '/new/5.webp',
    '/new/6.webp',
];

function Pic({imageLink}: { imageLink: string }) {
    return (
        // <div  className={classes.imageContainer}>
        //     <Image
        //         src={imageLink}
        //         alt={imageLink}
        //         fetchPriority="auto"
        //         className={classes.image}/>
        // </div>
        <Paper
            shadow="md" withBorder
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${imageLink})` }}
            className={classes.card}
        >
            
        </Paper>
    );
}

const slides = images.map((imgLink: string) => (
    <Carousel.Slide key={imgLink}>
        <Pic imageLink={imgLink}/>
    </Carousel.Slide>
));

export function PlanCarousel() {

        const autoplay = useRef(Autoplay({delay: 2000}));

        return <>
            <Carousel withIndicators={true}
                      slideSize={{base: '100%'}}
                      slideGap={{base: "sm", sm: 'xl'}}
                      draggable
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
                {/*{slides}*/}
                {slides}
            </Carousel>
        </>;
    }