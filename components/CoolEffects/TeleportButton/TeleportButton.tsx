'use client';
import classes from './TeleportButton.module.css';
import React, { useRef } from 'react';
import { Button } from '@mantine/core';
import {IconChevronDown} from "@tabler/icons-react";
import confetti from "canvas-confetti";
import {MyZIndexes} from "@/utils/my-constants";

export function TeleportButton(props: { targetID:string, text:string, variant?:string, size?:string, disableConfetti?:boolean, color?:string }) {
    const scrollToSection = () => {
        document.getElementById(props.targetID)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
    <Button variant={props.variant ?? "gradient"}
            gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
            color={props.color ?? ''}
            onClick={scrollToSection}
            name={props.text}
            size={props.size ?? "lg"}
            aria-label={props.text}
            fw={600}
    >
        {props.text}
    </Button>
    );
}
