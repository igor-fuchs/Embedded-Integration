import { useEffect, useState, useRef } from 'react';
import { StylePart } from './styles/Part';
import { isTouching } from './lib/PartLib';
import GreenPart from '../assets/images/green-part.svg?react';

interface PartProps {
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    conveyor: {
        ref: React.RefObject<HTMLDivElement | null>;
        running: boolean;
    };
    robot: {
        ref: React.RefObject<HTMLDivElement | null>;
        isGrabbed: boolean;
        movement: { x: React.CSSProperties, y: React.CSSProperties };
    };
    bigConveyorRef: React.RefObject<HTMLDivElement | null>;
    actuatorARef: React.RefObject<HTMLDivElement | null>;
    actuatorBRef: React.RefObject<HTMLDivElement | null>;
    actuatorCRef: React.RefObject<HTMLDivElement | null>;
}

export default function Part({ bodyIndex, bodyStyle, conveyor, robot, bigConveyorRef, actuatorARef, actuatorBRef, actuatorCRef }: PartProps) {
    const animationID = useRef<number | null>(null);
    const frameTime = useRef<number>(0);
    const partRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({
        x: 0,
        y: 0,
    });

    // Track previous robot position for incremental movement
    const previousRobotPosition = useRef({ x: 0, y: 0 });
    const [partTransition, setPartTransition] = useState<string>('');

    // Conveyor Animation Effect
    useEffect(() => {
        // Stopping unnecessary animation frames
        if (!conveyor.running || !isTouching(partRef, conveyor.ref)) {
            cancelAnimationFrame(animationID.current!);
            animationID.current = null;
            return;
        }

        const followConveyor = (currentTime: number) => {
            // Intializing the animation start time
            if (!frameTime.current) {
                frameTime.current = currentTime;
            }

            // Calculating time difference
            const deltaTime = currentTime - frameTime.current;

            if (deltaTime > 0) {
                const speed = parseFloat(conveyor.ref.current?.dataset.speedMs || '0');

                // Moving animation based on speed and time elapsed
                setOffset(prev => ({ ...prev, y: prev.y - speed * deltaTime }));

                // Changing the firstTime to the current time after frame update
                frameTime.current = currentTime;
            }

            animationID.current = requestAnimationFrame(followConveyor);
        };

        frameTime.current = 0;
        animationID.current = requestAnimationFrame(followConveyor);
        return () => {
            if (animationID.current) {
                cancelAnimationFrame(animationID.current);
                animationID.current = null;
            }
        };

    }, [conveyor.running]);

    // Robot Movement Effect - when part is grabbed by robot
    useEffect(() => {
        if (!robot.isGrabbed || !robot.ref.current) return;
        
        // Helper to parse translateX(Npx) or translateY(Npx) from transform string
        const parseTranslate = (transform: string | undefined): number => {
            if (!transform) return 0;
            const match = transform.match(/translate[XY]\(([+-]?[\d.]+)px\)/);
            return match ? parseFloat(match[1]) : 0;
        };

        // Extract current robot position from robot.movement
        const currentX = parseTranslate(robot.movement.x.transform as string);
        const currentY = parseTranslate(robot.movement.y.transform as string);

        // Calculate incremental delta
        const deltaX = currentX - previousRobotPosition.current.x;
        const deltaY = currentY - previousRobotPosition.current.y;

        // Apply incremental offset if there's any movement
        if (deltaX !== 0 || deltaY !== 0) {
            setOffset(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            // Update previous position
            previousRobotPosition.current = { x: currentX, y: currentY };

            // Extract and combine transitions (use the one that's not default)
            const xTransition = robot.movement.x.transition as string;
            const yTransition = robot.movement.y.transition as string;

            // Apply transition (prefer the one with transform in it)
            const transition = xTransition?.includes('transform') ? xTransition : yTransition;
            if (transition) {
                setPartTransition(transition);
            }
        }

    }, [robot.isGrabbed, robot.movement]);

    return (
        <StylePart
            ref={partRef}
            style={{
                ...bodyStyle,
                zIndex: bodyIndex,
                transition: partTransition
            }}
            $xOffset={offset.x}
            $yOffset={offset.y}
        >
            <GreenPart className='part' />
        </StylePart>
    );
}