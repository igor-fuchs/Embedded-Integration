import { useEffect, useState, useRef } from 'react';
import { StylePart } from './styles/Part';
import { followConveyorAnimation, isTouching } from './lib/PartLib';
import GreenPart from '../assets/images/green-part.svg?react';
import type { RobotMovement } from './Robot';

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
        movement: RobotMovement;
    };
    bigConveyor: {
        ref: React.RefObject<HTMLDivElement | null>;
        running: boolean;
    }
    actuatorARef: React.RefObject<HTMLDivElement | null>;
    actuatorBRef: React.RefObject<HTMLDivElement | null>;
    actuatorCRef: React.RefObject<HTMLDivElement | null>;
    scaleFactor: number;
}

export default function Part({ bodyIndex, bodyStyle, conveyor, robot, bigConveyor, actuatorARef, actuatorBRef, actuatorCRef, scaleFactor }: PartProps) {
    const partRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({
        x: 81.5,
        y: -170,
    });
    
    // Conveyor vars
    const conveyorAnimationID = useRef<number | null>(null);
    const conveyorFrameTime = useRef<number>(0);

    //Big conveyor vars
    const bigConveyorAnimationID = useRef<number | null>(null);
    const bigConveyorFrameTime = useRef<number>(0);

    // Robot vars
    const previousRobotPosition = useRef({ x: null, y: null } as { x: number | null; y: number | null }); // Track previous robot position for incremental movement
    const [partTransition, setPartTransition] = useState<string>('');



    // #region First Conveyor
    useEffect(() => {
        followConveyorAnimation({
            conveyorRef: conveyor.ref,
            frameTime: conveyorFrameTime,
            animationID: conveyorAnimationID,
            running: conveyor.running,
            touching: isTouching(partRef, conveyor.ref),
            scaleFactor,
            setOffset
        });
    }, [conveyor.running]);
    // #endregion

    // #region Robot
    useEffect(() => {
        if (!robot.isGrabbed) {
            previousRobotPosition.current = { x: null, y: null };
            if (partTransition) setPartTransition(''); // Avoid unexpected delays
            return;
        }
        if (!robot.ref.current) return;

        // Extract current robot position from robot.movement
        const currentX = robot.movement.x.transformPx;
        const currentY = robot.movement.y.transformPx;

        // Initialize previous position if not set
        if (previousRobotPosition.current.x === null || previousRobotPosition.current.y === null) {
            previousRobotPosition.current = { x: currentX, y: currentY };
        }

        // Calculate incremental delta
        const deltaX = currentX - (previousRobotPosition.current.x ?? currentX);
        const deltaY = currentY - (previousRobotPosition.current.y ?? currentY);

        // Apply incremental offset if there's any movement
        if (deltaX !== 0 || deltaY !== 0) {
            setOffset(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            // Update previous position
            previousRobotPosition.current = { x: currentX, y: currentY };

            // Extract and combine transitions (use the one that's not default)
            const xTransitionMs = robot.movement.x.transitionMs;
            const yTransitionMs = robot.movement.y.transitionMs; // Check if in the future we need to combine both

            // Apply transition (prefer the x transition)
            const transition = `transform ${xTransitionMs}ms ease`;
            if (transition) {
                setPartTransition(transition);
            }
        }

    }, [robot.isGrabbed, robot.movement]);
    // #endregion

    // #region Big Conveyor
    useEffect(() => {
        followConveyorAnimation({
            conveyorRef: bigConveyor.ref,
            frameTime: bigConveyorFrameTime,
            animationID: bigConveyorAnimationID,
            running: bigConveyor.running,
            touching: isTouching(partRef, bigConveyor.ref),
            scaleFactor,
            setOffset
        });


    }, [bigConveyor.running]);
    // #endregion

    return (
        <StylePart
            ref={partRef}
            style={{
                ...bodyStyle,
                zIndex: bodyIndex,
                transition: partTransition
            }}
            $xOffset={offset.x * scaleFactor}
            $yOffset={offset.y * scaleFactor}
        >
            <GreenPart className='part' />
        </StylePart>
    );
}