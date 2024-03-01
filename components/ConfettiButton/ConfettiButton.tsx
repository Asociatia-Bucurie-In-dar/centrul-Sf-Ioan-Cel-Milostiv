"use client";
import Link from "next/link";
import {Button} from "@mantine/core";
import confetti from "canvas-confetti";
import {MyRoutePaths} from "@/utils/route-paths";
import {MyZIndexes} from "@/utils/my-constants";


export function ConfettiButton(props: {text: string, size?: string, mt?: string, disabled?: boolean }) {
    const handleButtonClicked = () => {
        fire(0.25, {spread: 26, startVelocity: 55,});
        fire(0.2, {spread: 60,});
        fire(0.1, {spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2});
        fire(0.1, {spread: 120, startVelocity: 45,});
    };
    
    const defaults = { origin: { y: 0.6 } };
    const zIndex = MyZIndexes.Confetti;
    
    function fire(particleRatio: any, opts: any) {
        confetti({...defaults, ...opts,
            particleCount: Math.floor(150 * particleRatio),
            zIndex: zIndex,
        });
    }
    
    return (
                <Button variant="gradient"
                        gradient={{ from: 'pink', to: 'yellow', deg: 90 }}
                        name={props.text}
                        size={props.size}
                        mt={props.mt}
                        disabled={props.disabled ?? false}
                        onClick={handleButtonClicked}
                >
                    {props.text}
                </Button>
    );
}