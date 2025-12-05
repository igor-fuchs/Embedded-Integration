import { StylePart } from './styles/Part';
import { useEffect, useState, useRef } from 'react';
import GreenPart from '../assets/images/green-part.svg?react';

interface PartProps {
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    conveyorRunning: boolean;
    conveyorRef: React.RefObject<HTMLDivElement | null>;
    robotRef: React.RefObject<HTMLDivElement | null>;
    bigConveyorRef: React.RefObject<HTMLDivElement | null>;
    actuatorARef: React.RefObject<HTMLDivElement | null>;
    actuatorBRef: React.RefObject<HTMLDivElement | null>;
    actuatorCRef: React.RefObject<HTMLDivElement | null>;
}

// Constantes de animação sincronizadas com a esteira
const CONVEYOR_ANIMATION_DURATION = 5000; // 5 segundos (igual ao CSS da esteira)
const FRAME_RATE = 60;
const FRAME_INTERVAL = 1000 / FRAME_RATE;

export default function Part({ bodyIndex, bodyStyle, conveyorRunning, conveyorRef, robotRef, bigConveyorRef, actuatorARef, actuatorBRef, actuatorCRef }: PartProps) {
    const [yOffset, setYOffset] = useState(0);
    const xOffset = 0;
    const animationRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);

    // Calcula a velocidade baseada na altura da esteira
    const getConveyorSpeed = () => {
        if (!conveyorRef.current) return 0;
        // A animação da esteira move 50% da altura em 5 segundos
        const conveyorHeight = conveyorRef.current.offsetHeight;
        const totalMovement = conveyorHeight * 0.5; // 50% da altura
        // Velocidade em pixels por milissegundo
        return totalMovement / CONVEYOR_ANIMATION_DURATION;
    };

    useEffect(() => {
        if (!conveyorRunning) {
            // Para a animação quando a esteira para
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
            return;
        }

        const animate = (currentTime: number) => {
            if (!lastTimeRef.current) {
                lastTimeRef.current = currentTime;
            }

            const deltaTime = currentTime - lastTimeRef.current;

            if (deltaTime >= FRAME_INTERVAL) {
                const speed = getConveyorSpeed();
                // Move para cima (negativo no Y) sincronizado com a esteira
                setYOffset(prev => prev - speed * deltaTime);
                lastTimeRef.current = currentTime;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        lastTimeRef.current = 0;
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [conveyorRunning, conveyorRef]);

    return (
        <StylePart style={bodyStyle} $xOffset={xOffset} $yOffset={yOffset}>
            <GreenPart className='part' style={{ zIndex: bodyIndex, position: 'absolute', left: 0 }} />
        </StylePart>
    );
}