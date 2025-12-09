import { StyleRobot } from "./styles/Robot"
import React, { useEffect, useRef } from "react";
import RobotRightBody from "../assets/images/robot-right-body.svg?react";
import RobotRightAxisX from "../assets/images/robot-right-axis-x.svg?react";
import RobotRightAxisY from "../assets/images/robot-right-axis-y.svg?react";
import RobotLeftBody from "../assets/images/robot-left-body.svg?react";
import RobotLeftAxisX from "../assets/images/robot-left-axis-x.svg?react";
import RobotLeftAxisY from "../assets/images/robot-left-axis-y.svg?react";

export interface RobotMovement {
    x: React.CSSProperties;
    y: React.CSSProperties;
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
}

export default function Robot({ id, ref, bodyIndex, bodyStyle, moveToHome, moveToPick, moveToAntecipation, moveToDrop, robotMovement, setRobotMovement }: RobotProps) {
    const axesIndex = bodyIndex - 1;
    const axisXIndex = bodyIndex - 2;
    const axisYIndex = bodyIndex - 3;

    // Select robot svg based on ID
    const RobotBody = id.includes("right") ? RobotRightBody : RobotLeftBody;
    const RobotAxisX = id.includes("right") ? RobotRightAxisX : RobotLeftAxisX;
    const RobotAxisY = id.includes("right") ? RobotRightAxisY : RobotLeftAxisY;

    // Track current X and Y offset so we can stop exactly where we are
    const xOffset = useRef(0);
    const yOffset = useRef(0);

    useEffect(() => {
        if (!ref.current) return;

        // NOTE: Movement maximum (39, 25) | Movement minimum (-10, -20) -> (X, Y)
        // Determine positions (x px, y px)
        ref.current.dataset.homePosition = '0,0';
        ref.current.dataset.pickPosition = '100,0';
        ref.current.dataset.anticipationPosition = '100,50';
        ref.current.dataset.dropPosition = '100,100';

        // Determine movement times (x ms, y ms)
        ref.current.dataset.homeTimeMs = '400,400';
        ref.current.dataset.pickTimeMs = '400,400';
        ref.current.dataset.anticipationTimeMs = '400,400';
        ref.current.dataset.dropTimeMs = '400,400';
    }, []);

    useEffect(() => {
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

        // Move to home - Moving to (0, 0) (center, center)
        if (moveToHome && !homePostion) {
            xOffset.current = 0;
            yOffset.current = 0;
            movementTime = ref.current!.dataset.homeTimeMs!;
        }

        // Move to pick - Moving to (0, 100) (center, down)
        if (moveToPick && !pickPosition) {
            xOffset.current = 0;
            yOffset.current = 100;
            movementTime = ref.current!.dataset.pickTimeMs!;
        }

        // Move to anticipation - Moving to (50, 50) (half right, half down)
        if (moveToAntecipation && !anticipationPosition) {
            xOffset.current = 50;
            yOffset.current = 50;
            movementTime = ref.current!.dataset.anticipationTimeMs!;
        }

        // Move to drop - Moving to (100, 100) (right, down)
        if (moveToDrop && !dropPosition) {
            xOffset.current = 100;
            yOffset.current = 100;
            movementTime = ref.current!.dataset.dropTimeMs!;
        }

        const [timeX, timeY] = movementTime.split(',');

        setRobotMovement({
            x: {
                transform: `translateX(${xOffset.current}px)`,
                transition: `transform ${timeX}ms ease`,
            },
            y: {
                transform: `translateY(${yOffset.current}px)`,
                transition: `transform ${timeY}ms ease`,
            }
        });

    }, [moveToHome, moveToPick, moveToAntecipation, moveToDrop]);

    return (
        <StyleRobot id={id} ref={ref} style={bodyStyle}>
            <RobotBody className="body" style={{ zIndex: bodyIndex }} />

            {/* Axes Animated - Axis Y is coupled in the Axis X */}
            <div
                className="axes" style={{ zIndex: axesIndex, ...robotMovement.x }} >
                <RobotAxisX className="axis-x" style={{ zIndex: axisXIndex }} />
                <RobotAxisY className="axis-y" style={{ zIndex: axisYIndex, ...robotMovement.y }} />
            </div>
        </StyleRobot>
    );
}