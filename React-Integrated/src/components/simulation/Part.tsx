import { useCallback, useEffect, useState, useRef } from 'react';
import { StylePart } from '@styles/Part';
import { followConveyorAnimation, isTouching } from '../../lib/PartLib';
import GreenPart from '@assets/images/green-part.svg?react';
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
    actuatorA: {
        ref: React.RefObject<HTMLDivElement | null>;
        movement: { retract: boolean, advance: boolean };
    }
    actuatorB: {
        ref: React.RefObject<HTMLDivElement | null>;
        movement: { retract: boolean, advance: boolean };
    }
    actuatorC: {
        ref: React.RefObject<HTMLDivElement | null>;
        movement: { retract: boolean, advance: boolean };
    }
    scaleFactor: number;
}

export default function Part({ bodyIndex, bodyStyle, conveyor, robot, bigConveyor, actuatorA, actuatorB, actuatorC, scaleFactor }: PartProps) {
    // #region Refs, States, Callbacks
    const partRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({
        x: 0,
        y: 0,
    });

    // Frozen flag
    const [isFinished, setIsFinished] = useState<boolean>(false);

    // Conveyor dependencies
    const conveyorAnimationID = useRef<number | null>(null);
    const conveyorFrameTime = useRef<number>(0);

    //Big conveyor dependencies
    const bigConveyorAnimationID = useRef<number | null>(null);
    const bigConveyorFrameTime = useRef<number>(0);
    const [rampAnimation, setRampAnimation] = useState<number>(0);

    // Robot dependencies
    const previousRobotPosition = useRef({ x: null, y: null } as { x: number | null; y: number | null }); // Track previous robot position for incremental movement
    const [partTransition, setPartTransition] = useState<string>('');
    const actuatorPushAnimationID = useRef<number | null>(null);

    // Actuator dependencies
    const pushIfColliding = useCallback(
        (actuatorRef: React.RefObject<HTMLDivElement | null>, index: number, pushForce: number = 5) => {
            if (isFinished) return;
            if (!partRef.current || !actuatorRef.current) return;

            const partRect = partRef.current.getBoundingClientRect();
            const actuatorRect = actuatorRef.current.getBoundingClientRect();

            // Handle ramp animation triggering
            if (rampAnimation === 0) { // 0 = Not animating yet

                const rampIdMap: Record<number, string> = {
                    0: "ramp-a",
                    1: "ramp-b",
                    2: "ramp-c",
                };

                const parentElement = bigConveyor.ref.current!.parentElement!;
                const targetRamp = parentElement.querySelector(`[data-id="${rampIdMap[index]}"]`) as HTMLElement;
                const rampRect = targetRamp!.getBoundingClientRect();

                const isInsideRamp =
                    rampRect &&
                    rampRect.left <= partRect.left &&
                    rampRect.right >= partRect.right &&
                    rampRect.top <= partRect.top &&
                    rampRect.bottom >= partRect.bottom;

                // trigger ramp animation
                if (isInsideRamp) {
                    setRampAnimation(index + 1);
                }
            }

            const isColliding =
                partRect.left < actuatorRect.right &&
                partRect.right > actuatorRect.left &&
                partRect.top < actuatorRect.bottom &&
                partRect.bottom > actuatorRect.top;

            if (!isColliding) return;

            const partCenterX = partRect.left + partRect.width / 2;
            const actuatorCenterX = actuatorRect.left + actuatorRect.width / 2;
            const directionX = partCenterX - actuatorCenterX;

            if (directionX === 0) return;

            const deltaX = Math.sign(directionX) * (pushForce / scaleFactor);
            setOffset(prev => ({ ...prev, x: prev.x + deltaX }));
            return;
        },
        [scaleFactor, rampAnimation]
    );
    // #endregion

    // #region First Conveyor
    useEffect(() => {
        if (isFinished) return;
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
        if (isFinished) return;
        if (!robot.isGrabbed) {
            previousRobotPosition.current = { x: null, y: null };
            if (partTransition) {
                setPartTransition(''); // Avoid unexpected delays
            }
            return;
        }
        if (!robot.ref.current || !isTouching(partRef, robot.ref)) return;

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
        if (isFinished) return;
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

    // #region Actuators
    useEffect(() => {
        if (isFinished) return;
        const anyAdvance = actuatorA.movement.advance || actuatorB.movement.advance || actuatorC.movement.advance;

        // Stop if any actuator is not advancing
        if (!anyAdvance) {
            if (actuatorPushAnimationID.current) {
                cancelAnimationFrame(actuatorPushAnimationID.current);
                actuatorPushAnimationID.current = null;
            }
            return;
        }

        const animatePush = () => {
            [actuatorA, actuatorB, actuatorC].map((actuator, index) => {
                if (actuator.movement.advance) {
                    pushIfColliding(actuator.ref, index); // Starts pushing, and ramp animation
                }
            });

            if (anyAdvance) {
                actuatorPushAnimationID.current = requestAnimationFrame(animatePush);
            } else {
                actuatorPushAnimationID.current = null;
            }
        };

        actuatorPushAnimationID.current = requestAnimationFrame(animatePush);

        return () => {
            if (actuatorPushAnimationID.current) {
                cancelAnimationFrame(actuatorPushAnimationID.current);
                actuatorPushAnimationID.current = null;
            }
        };

    }, [actuatorA.movement.advance, actuatorB.movement.advance, actuatorC.movement.advance, pushIfColliding]);
    // #endregion

    // #region Ramp
    useEffect(() => {
        if (isFinished) return;
        if (rampAnimation === 0) return;
        if (!partRef.current || !bigConveyor.ref.current) return;

        const parentElement = bigConveyor.ref.current.parentElement;
        if (!parentElement) return;

        const rampIdMap: Record<number, string> = {
            1: "ramp-a-end",
            2: "ramp-b-end",
            3: "ramp-c-end",
        };
        const rampId = rampIdMap[rampAnimation];
        if (!rampId) return;

        const targetRamp = parentElement.querySelector(`[data-id="${rampId}"]`) as HTMLElement | null;
        if (!targetRamp) return;

        const partRect = partRef.current.getBoundingClientRect();
        const rampRect = targetRamp.getBoundingClientRect();

        const targetCenterX = (rampRect.left + rampRect.right) / 2;
        const targetCenterY = (rampRect.top + rampRect.bottom) / 2;
        const partCenterX = (partRect.left + partRect.right) / 2;
        const partCenterY = (partRect.top + partRect.bottom) / 2;

        const deltaX = targetCenterX - partCenterX;
        const deltaY = targetCenterY - partCenterY;

        // Smoothly move the part to the ramp end center
        const animationTimeMs = 1000;
        setPartTransition(`transform ${animationTimeMs}ms ease-in`);
        setOffset(prev => ({
            ...prev,
            x: prev.x + deltaX / scaleFactor,
            y: prev.y + deltaY / scaleFactor,
        }));

        // When arrive in position down 15 px
        const timeoutId = setTimeout(() => {
            setPartTransition('transform 500ms ease-in');
            setOffset(prev => ({
                ...prev,
                y: prev.y + (15 / scaleFactor),
            }));
            setIsFinished(true);
        }, animationTimeMs + 100); // Wait for the first animation to complete

        return () => clearTimeout(timeoutId);

    }, [rampAnimation, scaleFactor]);
    // #endregion


    // #region Component Render
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
    // #endregion
}