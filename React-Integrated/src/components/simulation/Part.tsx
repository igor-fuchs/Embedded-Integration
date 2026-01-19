import { useCallback, useEffect, useState, useRef } from 'react';
import { StylePart } from '@styles/Part';
import { isTouching, isCompletelyInside } from '../../lib/PartLib';
import BluePart from '@assets/images/blue-part.svg?react';
import GreenPart from '@assets/images/green-part.svg?react';
import MetalPart from '@assets/images/metal-part.svg?react';
import type { RobotMovement } from './Robot';

// Mapping of SVG components based on color
const PART_COMPONENTES = {
    green: GreenPart,
    blue: BluePart,
    metal: MetalPart,
} as const;

interface PartProps {
    bodyIndex: number;
    svgColor: 'metal' | 'green' | 'blue';
    bodyStyle: React.CSSProperties;
    conveyor: {
        ref: React.RefObject<HTMLDivElement | null>;
        running: boolean;
        onStopAreaReached: () => void;
    };
    robot: {
        ref: React.RefObject<HTMLDivElement | null>;
        isGrabbed: boolean;
        movement: RobotMovement;
    };
    bigConveyor: {
        firstRef: React.RefObject<HTMLDivElement | null>;
        secondRef: React.RefObject<HTMLDivElement | null>;
        firstRunning: boolean;
        secondRunning: boolean;
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

export default function Part({ bodyIndex, svgColor, bodyStyle, conveyor, robot, bigConveyor, actuatorA, actuatorB, actuatorC, scaleFactor }: PartProps) {
    // #region Refs, States, Callbacks
    const partRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({
        x: 0,
        y: 0,
    });
    const PartComponent = PART_COMPONENTES[svgColor];

    // Frozen flag
    const [isFinished, setIsFinished] = useState<boolean>(false);

    // Conveyor dependencies
    const conveyorAnimationID = useRef<number | null>(null);
    const conveyorFrameTime = useRef<number>(0);

    //Big conveyor dependencies
    const [rampAnimation, setRampAnimation] = useState<number>(0);
    const bigConveyorFirstAnimationID = useRef<number | null>(null);
    const bigConveyorFirstFrameTime = useRef<number>(0);
    const bigConveyorFirstMonitorID = useRef<number | null>(null);
    const bigConveyorSecondAnimationID = useRef<number | null>(null);
    const bigConveyorSecondFrameTime = useRef<number>(0);
    const bigConveyorSecondMonitorID = useRef<number | null>(null);

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

                const parentElement = bigConveyor.secondRef.current!.parentElement!;
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
        if (isFinished || (robot.isGrabbed && isTouching(partRef, robot.ref))) {
            // Cancel animation if stopped
            if (conveyorAnimationID.current) {
                cancelAnimationFrame(conveyorAnimationID.current);
                conveyorAnimationID.current = null;
            }
            return;
        }

        let isActive = true;
        let monitorID: number | null = null;

        const monitorConveyor = () => {
            if (!isActive) return;

            // Check if part is completely inside the stop-area
            const stopAreaElement = conveyor.ref.current?.querySelector('.stop-area') as HTMLElement | null;
            if (stopAreaElement && isCompletelyInside(partRef, stopAreaElement)) {
                // Stop the animation
                if (conveyorAnimationID.current) {
                    cancelAnimationFrame(conveyorAnimationID.current);
                    conveyorAnimationID.current = null;
                    conveyorFrameTime.current = 0;
                }
                conveyor.onStopAreaReached(); // Notify parent to stop conveyor
                return; // Stop monitoring
            }

            const touching = isTouching(partRef, conveyor.ref);

            if (conveyor.running && touching) {
                // Start animation if not already running
                if (!conveyorAnimationID.current) {
                    const animate = (currentTime: number) => {
                        if (!isActive) return;

                        // Check stop-area again during animation
                        const stopArea = conveyor.ref.current?.querySelector('.stop-area') as HTMLElement | null;
                        if (stopArea && isCompletelyInside(partRef, stopArea)) {
                            if (conveyorAnimationID.current) {
                                cancelAnimationFrame(conveyorAnimationID.current);
                                conveyorAnimationID.current = null;
                                conveyorFrameTime.current = 0;
                            }
                            conveyor.onStopAreaReached(); // Notify parent to stop conveyor
                            return;
                        }

                        if (!conveyorFrameTime.current) {
                            conveyorFrameTime.current = currentTime;
                        }

                        const deltaTime = currentTime - conveyorFrameTime.current;

                        if (deltaTime > 0) {
                            const speed = parseFloat(
                                conveyor.ref.current?.dataset.speedMs || "0"
                            );
                            setOffset((prev) => ({
                                ...prev,
                                y: prev.y - (speed * deltaTime) / scaleFactor,
                            }));
                            conveyorFrameTime.current = currentTime;
                        }

                        conveyorAnimationID.current = requestAnimationFrame(animate);
                    };

                    conveyorFrameTime.current = 0;
                    conveyorAnimationID.current = requestAnimationFrame(animate);
                }
            } else {
                // Stop animation if not touching or not running
                if (conveyorAnimationID.current) {
                    cancelAnimationFrame(conveyorAnimationID.current);
                    conveyorAnimationID.current = null;
                    conveyorFrameTime.current = 0;
                }
            }

            // Continue monitoring
            monitorID = requestAnimationFrame(monitorConveyor);
        };

        monitorID = requestAnimationFrame(monitorConveyor);

        return () => {
            isActive = false;
            if (monitorID) {
                cancelAnimationFrame(monitorID);
                monitorID = null;
            }
            if (conveyorAnimationID.current) {
                cancelAnimationFrame(conveyorAnimationID.current);
                conveyorAnimationID.current = null;
            }
        };
    }, [conveyor.running, scaleFactor, isFinished, robot.isGrabbed]);
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
            //const yTransitionMs = robot.movement.y.transitionMs; // Check if in the future we need to combine both

            // Apply transition (prefer the x transition)
            const transition = `transform ${xTransitionMs}ms ease`;
            if (transition) {
                setPartTransition(transition);
            }
        }

    }, [robot.isGrabbed, robot.movement]);
    // #endregion

    // #region Big Conveyor 

    // Continuous monitoring for first big conveyor
    useEffect(() => {
        if (isFinished || (robot.isGrabbed && isTouching(partRef, robot.ref))) return;

        let isActive = true;

        const monitorFirstConveyor = () => {
            if (!isActive) return;

            const touching = isTouching(partRef, bigConveyor.firstRef);

            if (bigConveyor.firstRunning && touching) {
                // Start animation if not already running
                if (!bigConveyorFirstAnimationID.current) {
                    const animate = (currentTime: number) => {
                        if (!isActive) return;

                        if (!bigConveyorFirstFrameTime.current) {
                            bigConveyorFirstFrameTime.current = currentTime;
                        }

                        const deltaTime = currentTime - bigConveyorFirstFrameTime.current;

                        if (deltaTime > 0) {
                            const speed = parseFloat(
                                bigConveyor.firstRef.current?.dataset.speedMs || "0"
                            );
                            setOffset((prev) => ({
                                ...prev,
                                y: prev.y - (speed * deltaTime) / scaleFactor,
                            }));
                            bigConveyorFirstFrameTime.current = currentTime;
                        }

                        bigConveyorFirstAnimationID.current = requestAnimationFrame(animate);
                    };

                    bigConveyorFirstFrameTime.current = 0;
                    bigConveyorFirstAnimationID.current = requestAnimationFrame(animate);
                }
            } else {
                // Stop animation if running
                if (bigConveyorFirstAnimationID.current) {
                    cancelAnimationFrame(bigConveyorFirstAnimationID.current);
                    bigConveyorFirstAnimationID.current = null;
                    bigConveyorFirstFrameTime.current = 0;
                }
            }

            // Continue monitoring
            bigConveyorFirstMonitorID.current = requestAnimationFrame(monitorFirstConveyor);
        };

        bigConveyorFirstMonitorID.current = requestAnimationFrame(monitorFirstConveyor);

        return () => {
            isActive = false;
            if (bigConveyorFirstMonitorID.current) {
                cancelAnimationFrame(bigConveyorFirstMonitorID.current);
                bigConveyorFirstMonitorID.current = null;
            }
            if (bigConveyorFirstAnimationID.current) {
                cancelAnimationFrame(bigConveyorFirstAnimationID.current);
                bigConveyorFirstAnimationID.current = null;
            }
        };
    }, [bigConveyor.firstRunning, bigConveyor.firstRef, scaleFactor, isFinished]);

    // Continuous monitoring for second big conveyor
    useEffect(() => {
        if (isFinished) return;

        let isActive = true;

        const monitorSecondConveyor = () => {
            if (!isActive) return;

            const touching = isTouching(partRef, bigConveyor.secondRef);

            if (bigConveyor.secondRunning && touching) {
                // Start animation if not already running
                if (!bigConveyorSecondAnimationID.current) {
                    const animate = (currentTime: number) => {
                        if (!isActive) return;

                        if (!bigConveyorSecondFrameTime.current) {
                            bigConveyorSecondFrameTime.current = currentTime;
                        }

                        const deltaTime = currentTime - bigConveyorSecondFrameTime.current;

                        if (deltaTime > 0) {
                            const speed = parseFloat(
                                bigConveyor.secondRef.current?.dataset.speedMs || "0"
                            );
                            setOffset((prev) => ({
                                ...prev,
                                y: prev.y - (speed * deltaTime) / scaleFactor,
                            }));
                            bigConveyorSecondFrameTime.current = currentTime;
                        }

                        bigConveyorSecondAnimationID.current = requestAnimationFrame(animate);
                    };

                    bigConveyorSecondFrameTime.current = 0;
                    bigConveyorSecondAnimationID.current = requestAnimationFrame(animate);
                }
            } else {
                // Stop animation if running
                if (bigConveyorSecondAnimationID.current) {
                    cancelAnimationFrame(bigConveyorSecondAnimationID.current);
                    bigConveyorSecondAnimationID.current = null;
                    bigConveyorSecondFrameTime.current = 0;
                }
            }

            // Continue monitoring
            bigConveyorSecondMonitorID.current = requestAnimationFrame(monitorSecondConveyor);
        };

        bigConveyorSecondMonitorID.current = requestAnimationFrame(monitorSecondConveyor);

        return () => {
            isActive = false;
            if (bigConveyorSecondMonitorID.current) {
                cancelAnimationFrame(bigConveyorSecondMonitorID.current);
                bigConveyorSecondMonitorID.current = null;
            }
            if (bigConveyorSecondAnimationID.current) {
                cancelAnimationFrame(bigConveyorSecondAnimationID.current);
                bigConveyorSecondAnimationID.current = null;
            }
        };
    }, [bigConveyor.secondRunning, bigConveyor.secondRef, scaleFactor, isFinished]);
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
        if (!partRef.current || !bigConveyor.secondRef.current) return;

        const parentElement = bigConveyor.secondRef.current.parentElement;
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
            <PartComponent className='part' />
        </StylePart>
    );
    // #endregion
}