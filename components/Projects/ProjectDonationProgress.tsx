"use client";
import { useEffect, useState } from 'react';
import classes from './ProjectDonationProgress.module.css';
import {Center, Loader, Progress, ProgressLabel, ProgressRoot, ProgressSection, Skeleton, Text} from "@mantine/core";

export function ProjectDonationProgress (props :{id: string, goalAmount: number, sumTranslation: string } ) {
    const [currentAmount, setCurrentAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        const fetchDonoAmount = async () => {
            setLoading(true);
            const manualExtraAmount = 10000;
            try {
                const response = await fetch(`/api/projects/${props.id}`);
                
                const data = await response.json();
                const finalTotal = data.totalDonated + manualExtraAmount;
                setCurrentAmount(finalTotal);
                let progress = (finalTotal / props.goalAmount) * 100;
                if (progress < 2 && progress > 0)
                    setProgressValue(2);
                else setProgressValue(progress);
                
            } catch (error) {
                setCurrentAmount(manualExtraAmount);
                console.error('Failed to fetch donation amount:', error);
            }
            setLoading(false);
        };
        
        fetchDonoAmount().then(r => r);
    }, [props.id]);
    
    //TODO remove this repetition
    if (loading) {
        return <Center>
            <Text fz="xl" fw={500}>
                <Loader color="teal" size="xs" /> EUR / {props.goalAmount.toLocaleString()} EUR
            </Text>
        </Center>;
    }
    
    return <>
        <Center>
        <Text fz="xl" fw={500}>
            {currentAmount.toLocaleString()} EUR / {props.goalAmount.toLocaleString()} EUR
        </Text>
        </Center>
        
        {/*<Progress animated value={progressValue} mt="sm" size={19} radius="sm"*/}
        {/*          classNames={{*/}
        {/*              root: classes.progressTrack,*/}
        {/*              section: classes.progressSection*/}
        {/*          }}>*/}
        {/*</Progress>*/}
        
        </>;
}