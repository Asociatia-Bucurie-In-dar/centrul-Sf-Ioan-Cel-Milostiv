'use client';

import { Container, Title, Text, Stack, Group, Paper, Image, Center, Anchor } from '@mantine/core';
import { useEffect, useState } from 'react';
import classes from './Maintenance.module.css';
import Link from 'next/link';

const TARGET_DATE = new Date(2026, 1, 25, 0, 0, 0, 0).getTime();

function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <Paper p="xl" radius="md" className={classes.timeUnit}>
            <Text size="3rem" fw={700} className={classes.timeValue}>
                {String(value).padStart(2, '0')}
            </Text>
            <Text size="sm" c="dimmed" className={classes.timeLabel}>
                {label}
            </Text>
        </Paper>
    );
}

export function Maintenance() {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container size="md" className={classes.container}>
            <Stack align="center" gap="xl">
                <Center className={classes.imageWrapper}>
                    <Image
                        src="/sfIoan.png"
                        alt="Icoana Sfântul Ioan cel Milostiv"
                        className={classes.image}
                        width={200}
                        height={200}
                    />
                </Center>

                <Title order={1} size="2.5rem" ta="center" className={classes.title}>
                    În actualizare
                </Title>
                <Text size="lg" ta="center" c="dimmed" className={classes.subtitle}>
                    Se deschide pe 25 Februarie 2026
                </Text>

                <Group gap="md" mt="xl" className={classes.timer}>
                    <TimeUnit value={timeRemaining.days} label="Zile" />
                    <TimeUnit value={timeRemaining.hours} label="Ore" />
                    <TimeUnit value={timeRemaining.minutes} label="Minute" />
                    <TimeUnit value={timeRemaining.seconds} label="Secunde" />
                </Group>
                <div style={{marginBottom: '2rem'}}></div>

                <Text size="lg" ta="center" c="dimmed" className={classes.subtitle}>
                    Proiect inițiat de <Link 
                    href="https://www.bucurieindar.ro" 
                    rel="noopener noreferrer"
                    className={classes.link}
                    mt="xl"
                >
                    www.bucurieindar.ro
                </Link>
                </Text>
        
                
            </Stack>
        </Container>
    );
}

