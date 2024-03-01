import {Card, Image, Text, Progress, CardSection, Button, Container} from '@mantine/core';

import classes from './ProjectPreviewCard.module.css';
import Link from "next/link";
import {ProjectTranslationsType, ProjectType} from "@/utils/my-types";
import {MyRoutePaths} from "@/utils/route-paths";
import {DonatePopupButton} from "@/components/Popups/DonatePopup/DonatePopupButton";
import {ProjectDonationProgress} from "@/components/Projects/ProjectDonationProgress";
import {useTranslations} from "next-intl";

export function ProjectPreviewCard(props: { project: ProjectType, title: string, description: string} ) {
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
    
    const linkProps = {
        href: MyRoutePaths.Projects + '/' + props.project.slug
    };
    
    return (
            <Card withBorder radius="md" className={classes.card}>
                <CardSection>
                    <Link {...linkProps}>
                        <Image src={props.project.image_path} 
                               height={200}
                               loading={"lazy"}
                            placeholder="blur"/>
                    </Link>
                </CardSection>

                {/*<Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>*/}
                {/*    outstanding*/}
                {/*</Badge>*/}

                <Text className={classes.title} fw={500} component={Link} {...linkProps}>
                    {props.title}
                </Text>

                <Text fz="sm" c="dimmed" lineClamp={4} component={Link} {...linkProps}>
                    {props.description}
                </Text>

                <Card padding={0} mt="sm" key={props.project.id}>
                    
                    <ProjectDonationProgress id={props.project.id} goalAmount={props.project.goalAmount}
                        sumTranslation={t('NECESSARY_AMOUNT')}/> 

                    <DonatePopupButton projectId={props.project.id} projectTile={props.title} 
                                       translations={donatePopupTranslations}/>
                </Card>
            </Card>
    );
}