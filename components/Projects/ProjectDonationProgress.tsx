"use client";
import { useEffect, useState } from 'react';
import classes from './ProjectDonationProgress.module.css';
import {Center, Progress, Skeleton, Text } from "@mantine/core";

export function ProjectDonationProgress (props :{id: string, goalAmount: number, sumTranslation: string } ) {
    const [currentAmount, setCurrentAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        const fetchDonationAmount = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/projects/${props.id}`);
                
                const data = await response.json();
                setCurrentAmount(data.totalDonated);
                let progress = (data.totalDonated / props.goalAmount) * 100;
                if (progress < 2 && progress > 0)
                    setProgressValue(2);
                else setProgressValue(progress);
                
            } catch (error) {
                console.error('Failed to fetch donation amount:', error);
            }
            setLoading(false);
        };
        
        fetchDonationAmount().then(r => r);
    }, [props.id]);
    
    if (loading) {
        return <>
            <Skeleton height={8} mt={13} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} mb={4} radius="xl" />
            </>;
    }
    
    return <>
        <Center>
        <Text fz="lg" fw={500}>
            {currentAmount.toLocaleString()} EUR / {props.goalAmount.toLocaleString()} EUR
        </Text>
        </Center>
        <Progress animated value={progressValue} mt="sm" size={14} radius="sm"
                  classNames={{
                      root: classes.progressTrack,
                      section: classes.progressSection,
                  }}>
        </Progress>
        </>;
}