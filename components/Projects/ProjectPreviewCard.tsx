import {Card, Image, Text, Progress, CardSection, Button, Container} from '@mantine/core';

import classes from './ProjectPreviewCard.module.css';
import Link from "next/link";
import {ProjectTranslationsType, ProjectType} from "@/utils/my-types";
import {MyRoutePaths} from "@/utils/route-paths";
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
import {ProjectDonationProgress} from "@/components/Projects/ProjectDonationProgress";
import {useTranslations} from "next-intl";

export function ProjectPreviewCard(props: { title: string, imgPath: string, texts: string[] } ) {
    const t = useTranslations('COMMON');
    const donateT = useTranslations('PROJECTS_MORE');
    const donatePopupTranslations : ProjectTranslationsType = {
        Donate: donateT('DONATE'),
        CardOption: donateT('CARD_OPTION'),
        BankTransferOption: donateT('BANK_TRANSFER_OPTION'),
        DesiredAmount: donateT('DESIRED_AMOUNT'),
        Continue: donateT('CONTINUE'),
        DonateFor: donateT('DONATE_FOR')
    };

    
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

                <Text className={classes.title} fw={500}>
                    {props.title}
                </Text>

                <Text fz="sm" c="dimmed" lineClamp={4}>
                    {props.texts}
                </Text>

                <Card padding={0} mt="sm" key={props.title}>
                    
                    
                </Card>
            </Card>
    );
}