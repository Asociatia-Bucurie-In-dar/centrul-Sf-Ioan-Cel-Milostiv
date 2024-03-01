"use client";
import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {MyZIndexes} from "@/utils/my-constants";

const FirstTimeConfetti = () => {
    useEffect(() => {

        const firstTimeKey : string = 'firstTimeVisitedBucurieInDar';
        if (localStorage.getItem(firstTimeKey)) 
            { return; }
        
        const defaults = { origin: { y: 0.6 } };
        const zIndex = MyZIndexes.Confetti;
        function fire(particleRatio: any, opts: any) {
            confetti({...defaults, ...opts,
                particleCount: Math.floor(150 * particleRatio),
                zIndex: zIndex,
            });
        }
        const triggerAllConfetti = () => {
            fire(0.25, {spread: 26, startVelocity: 55,});
            fire(0.2, {spread: 60,});
            fire(0.1, {spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2});
            fire(0.1, {spread: 120, startVelocity: 45,});
        };
        
        localStorage.setItem(firstTimeKey, 'true');
        triggerAllConfetti();
        
    }, []);

    return null; // This component doesn't render anything
};

export default FirstTimeConfetti;
