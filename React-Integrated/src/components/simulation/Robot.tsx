import { StyleRobot } from "@styles/Robot"
import React, { useEffect, useRef } from "react";
import RobotRightBody from "@assets/images/robot-right-body.svg?react";
import RobotRightAxisX from "@assets/images/robot-right-axis-x.svg?react";
import RobotRightAxisY from "@assets/images/robot-right-axis-y.svg?react";
import RobotLeftBody from "@assets/images/robot-left-body.svg?react";
import RobotLeftAxisX from "@assets/images/robot-left-axis-x.svg?react";
import RobotLeftAxisY from "@assets/images/robot-left-axis-y.svg?react";

export interface RobotMovement {
    x: {
        transformPx: number;
        transitionMs: number;
    };
    y: {
        transformPx: number;
        transitionMs: number;
    };
}

interface RobotProps {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    moveToHome: boolean;
    moveToPick: boolean;
    moveToAntecipation: boolean;
    moveToDrop: boolean;
    robotMovement: RobotMovement;
    setRobotMovement: React.Dispatch<React.SetStateAction<RobotMovement>>;
    scaleFactor: number;
}

export default function Robot({ id, ref, bodyIndex, bodyStyle, moveToHome, moveToPick, moveToAntecipation, moveToDrop, robotMovement, setRobotMovement, scaleFactor }: RobotProps) {
    const axesIndex = bodyIndex - 1;
    const axisXIndex = bodyIndex - 2;
    const axisYIndex = bodyIndex - 3;

    // Select robot svg based on ID
    const RobotBody = id.includes("right") ? RobotRightBody : RobotLeftBody;
    const RobotAxisX = id.includes("right") ? RobotRightAxisX : RobotLeftAxisX;
    const RobotAxisY = id.includes("right") ? RobotRightAxisY : RobotLeftAxisY;
    const gripperStyle = {
        width: 18 * scaleFactor,
        height: 13 * scaleFactor,
        bottom: 16 * scaleFactor,
        ...(id.includes("right") ? { left: 0 } : { right: 0 }),
        //backgroundColor: 'black',
    };

    // Track current X and Y offset so we can stop exactly where we are
    const xOffset = useRef(0);
    const yOffset = useRef(0);

    useEffect(() => {
        if (!ref.current) return;
        const inverter = (x: number) => id.includes("right") ? x * -1 : x; // Invert X for left robot

        // Determine positions (x px, y px)
        const homePosition = { x: inverter(0), y: 0 };
        const pickPosition = { x: inverter(0), y: 15 };
        const anticipationPosition = { x: inverter(12.5), y: 12.5 };
        const dropPosition = { x: inverter(81.5), y: 15 };

        ref.current.dataset.homePosition = `${homePosition.x},${homePosition.y}`;
        ref.current.dataset.pickPosition = `${pickPosition.x},${pickPosition.y}`;
        ref.current.dataset.anticipationPosition = `${anticipationPosition.x},${anticipationPosition.y}`;
        ref.current.dataset.dropPosition = `${dropPosition.x},${dropPosition.y}`;

        // Determine movement times (x ms, y ms)
        ref.current.dataset.homeTimeMs = '400,400';
        ref.current.dataset.pickTimeMs = '400,400';
        ref.current.dataset.anticipationTimeMs = '400,400';
        ref.current.dataset.dropTimeMs = '400,400';
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        // If no movement command, do nothing
        if (!moveToHome && !moveToPick && !moveToAntecipation && !moveToDrop) return;

        // If already in position, do nothing
        const homePostion = ref.current?.dataset.homePosition === `${xOffset.current},${yOffset.current}`;
        const pickPosition = ref.current?.dataset.pickPosition === `${xOffset.current},${yOffset.current}`;
        const anticipationPosition = ref.current?.dataset.anticipationPosition === `${xOffset.current},${yOffset.current}`;
        const dropPosition = ref.current?.dataset.dropPosition === `${xOffset.current},${yOffset.current}`;
        if ((moveToHome && homePostion) || (moveToPick && pickPosition) || (moveToAntecipation && anticipationPosition) || (moveToDrop && dropPosition)) return;

        // (X time, Y time)
        let movementTime = "0,0";

        // Move to home
        if (moveToHome && !homePostion) {
            const postion = ref.current!.dataset.homePosition!.split(',');
            xOffset.current = parseFloat(postion[0]);
            yOffset.current = parseFloat(postion[1]);
            movementTime = ref.current!.dataset.homeTimeMs!;
        }

        // Move to pick
        if (moveToPick && !pickPosition) {
            const postion = ref.current!.dataset.pickPosition!.split(',');
            xOffset.current = parseFloat(postion[0]);
            yOffset.current = parseFloat(postion[1]);
            movementTime = ref.current!.dataset.pickTimeMs!;
        }

        // Move to anticipation
        if (moveToAntecipation && !anticipationPosition) {
            const postion = ref.current!.dataset.anticipationPosition!.split(',');
            xOffset.current = parseFloat(postion[0]);
            yOffset.current = parseFloat(postion[1]);
            movementTime = ref.current!.dataset.anticipationTimeMs!;
        }

        // Move to drop
        if (moveToDrop && !dropPosition) {
            const postion = ref.current!.dataset.dropPosition!.split(',');
            xOffset.current = parseFloat(postion[0]);
            yOffset.current = parseFloat(postion[1]);
            movementTime = ref.current!.dataset.dropTimeMs!;
        }

        const [timeX, timeY] = movementTime.split(',');

        setRobotMovement({
            x: {
                transformPx: xOffset.current,
                transitionMs: parseInt(timeX),
            },
            y: {
                transformPx: yOffset.current,
                transitionMs: parseInt(timeY),
            }
        });

    }, [moveToHome, moveToPick, moveToAntecipation, moveToDrop]);

    return (
        <StyleRobot id={id} style={bodyStyle}>
            <RobotBody className="body" style={{ zIndex: bodyIndex }} />

            {/* Axes Animated - Axis Y is coupled in the Axis X */}
            <div
                className="axes"
                style={{
                    zIndex: axesIndex,
                    transform: `translateX(${robotMovement.x.transformPx * scaleFactor}px)`,
                    transition: `transform ${robotMovement.x.transitionMs}ms ease`
                }}
            >
                <RobotAxisX className="axis-x" style={{ zIndex: axisXIndex }} />
                <div
                    className="axis-y div"
                    style={{
                        zIndex: axisYIndex,
                        transform: `translateY(${robotMovement.y.transformPx * scaleFactor}px)`,
                        transition: `transform ${robotMovement.y.transitionMs}ms ease`
                    }}
                >
                    <RobotAxisY className="axis-y" />
                    <div className="gripper" ref={ref} style={gripperStyle} />
                </div>
            </div>
        </StyleRobot>
    );
}