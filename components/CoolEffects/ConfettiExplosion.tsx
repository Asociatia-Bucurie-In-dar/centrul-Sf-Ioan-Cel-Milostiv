import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiExplosion = () => {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    });

    return null; // This component doesn't render anything
};

export default ConfettiExplosion;
