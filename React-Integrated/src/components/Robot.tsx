import { StyleRobot } from "./styles/Robot"
import RobotLeftBody from "../assets/images/robot-left-body.svg?react";
import RobotLeftAxisX from "../assets/images/robot-left-axis-x.svg?react";
import RobotLeftAxisY from "../assets/images/robot-left-axis-y.svg?react";
import { useEffect, useState } from "react";

interface RobotProps {
    id: string;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    axisXStyle: React.CSSProperties;
    axisYStyle: React.CSSProperties;
    // Animation control
    moveToHome: boolean;
    moveToPick: boolean;
    moveToAntecipation: boolean;
    moveToDrop: boolean;
}

export default function Robot({ id, bodyIndex, bodyStyle, axisXStyle, axisYStyle, moveToHome, moveToPick, moveToAntecipation, moveToDrop }: RobotProps) {
    // Track current X offset so we can stop exactly where we are
    const [xOffset, setXOffset] = useState(0);
    const [yOffset, setYOffset] = useState(0);

    useEffect(() => {
        // Determine positions
        const homePostion = xOffset == 0 && yOffset == 0;
        const pickPosition = xOffset == 100 && yOffset == 0;
        const anticipationPosition = xOffset == 100 && yOffset == -50;
        const dropPosition = xOffset == 200 && yOffset == -50;

        // Movement maximum (39, 25) | Movement minimum (-10, -20) -> (X, Y)
        // Move to home - Moving to (0, 0)
        if (moveToHome && !homePostion) {
            setXOffset(0);
            setYOffset(0);
            return;
        }

        // Move to pick - Moving to (0, -100)
        if (moveToPick && !pickPosition) {
            setXOffset(0);
            setYOffset(-100);
            return;
        }

        // Move to anticipation - Moving to (50, -50)
        if (moveToAntecipation && !anticipationPosition) {
            setXOffset(50);
            setYOffset(-50);
            return;
        }

        // Move to drop - Moving to (100, -100)
        if (moveToDrop && !dropPosition) {
            setXOffset(100);
            setYOffset(-100);
            return;
        }
    }, [moveToHome, moveToPick, moveToAntecipation, moveToDrop]);

    return (
        <StyleRobot id={id} style={bodyStyle} xOffset={xOffset} yOffset={yOffset}>
            <RobotLeftBody className="body" style={{ zIndex: bodyIndex }} />

            {/* Axes Animated */}
            <div className="axes">
                <div className="axis-x" style={axisXStyle}>
                    <RobotLeftAxisX style={{ width: '100%', height: '100%', display: 'block' }} />
                    <div style={{position: "relative", width: "100%", height: "100%"}}>
                        <RobotLeftAxisY className="axis-y" style={axisYStyle} />
                    </div>
                </div>
                
            </div>

        </StyleRobot>
    );
}