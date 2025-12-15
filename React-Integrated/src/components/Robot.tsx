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

    // Track current X and Y offset so we can stop exactly where we are
    const xOffset = useRef(0);
    const yOffset = useRef(0);

    useEffect(() => {
        if (!ref.current) return;

        // NOTE: Movement maximum (39, 25) | Movement minimum (-10, -20) -> (X, Y)
        // Determine positions (x px, y px)
        const homePosition = {x: 0, y: 0};
        const pickPosition = {x: 0, y: 81};
        const anticipationPosition = {x: 12.5, y: 12.5};
        const dropPosition = {x: 39, y: 25};

        ref.current.dataset.homePosition = `${homePosition.x * scaleFactor},${homePosition.y * scaleFactor}`;
        ref.current.dataset.pickPosition = `${pickPosition.x * scaleFactor},${pickPosition.y * scaleFactor}`;
        ref.current.dataset.anticipationPosition = `${anticipationPosition.x * scaleFactor},${anticipationPosition.y * scaleFactor}`;
        ref.current.dataset.dropPosition = `${dropPosition.x * scaleFactor},${dropPosition.y * scaleFactor}`;

        // Determine movement times (x ms, y ms)
        ref.current.dataset.homeTimeMs = '400,400';
        ref.current.dataset.pickTimeMs = '400,400';
        ref.current.dataset.anticipationTimeMs = '400,400';
        ref.current.dataset.dropTimeMs = '400,400';
    }, [scaleFactor]);

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