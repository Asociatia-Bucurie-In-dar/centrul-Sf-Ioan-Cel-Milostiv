'use client';
import classes from './PlanCarousel.module.css';
import {Carousel} from "@mantine/carousel";
import {Button, Divider, Group, HoverCard, Image, Paper, rem, Text, Title} from "@mantine/core";
import commonClasses from "@/utils/commonClasses.module.css";
import {useRef} from "react";
import Autoplay from "embla-carousel-autoplay";

const images = [
    '/base/1.jpeg',
    '/base/2.jpeg',
    '/base/3.jpeg',
    '/base/4.jpeg',
    '/base/5.jpeg',
    '/base/6.jpeg',
    '/base/7.jpeg',
    '/base/8.jpeg',
    '/base/9.jpeg',
];

function Pic({imageLink}: { imageLink: string }) {
    return (
        <div  className={classes.imageContainer}>
            <Image
                src={imageLink}
                alt={imageLink}
                fetchPriority="auto"
                className={classes.image}/>
        </div>
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
                {/*{slides}*/}
                {slides}
            </Carousel>
        </>;
    }