import {Card, Image, Text, Progress, CardSection, Button, Container, Divider, List, ListItem} from '@mantine/core';

import classes from './ProjectPreviewCard.module.css';
import Link from "next/link";
import {ProjectTranslationsType, ProjectType} from "@/utils/my-types";
import {MyRoutePaths} from "@/utils/route-paths";
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
import {ProjectDonationProgress} from "@/components/Projects/ProjectDonationProgress";
import {useTranslations} from "next-intl";
import {IconCircle, IconCircleDot, IconListSearch} from "@tabler/icons-react";

export function ProjectPreviewCard(props: { title: string, imgPath: string, texts: string[] } ) {
    
    const texts = props.texts.map((text, index) => {
        return (
            <Text key={index} fz="sm" c="customDimmed" mt={5} mb={5} fw={600}>
                • {text}
            </Text>
        );
    });
    
    return (
            <Card withBorder radius="md" className={classes.card}>
                <CardSection>
                        <Image src={props.imgPath} 
                               height={200}
                               loading={"lazy"}
                            placeholder="blur"/>
                </CardSection>

                {/*<Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>*/}
                {/*    outstanding*/}
                {/*</Badge>*/}
                
                <Text className={classes.title} fw={600}>
                    {props.title}
                </Text>
                
                <Divider mb={3} color="transparent"/>

                <>
                    {texts}
                </>

                <Card padding={0} mt="sm" key={props.title}>
                    
                    
                </Card>
            </Card>
    );
}