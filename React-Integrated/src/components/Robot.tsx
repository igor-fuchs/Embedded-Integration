import { StyleRobot } from "./styles/Robot"
import { useEffect, useState, type FunctionComponent, type SVGProps } from "react";
import RobotRightBody from "../assets/images/robot-right-body.svg?react";
import RobotRightAxisX from "../assets/images/robot-right-axis-x.svg?react";
import RobotRightAxisY from "../assets/images/robot-right-axis-y.svg?react";
import RobotLeftBody from "../assets/images/robot-left-body.svg?react";
import RobotLeftAxisX from "../assets/images/robot-left-axis-x.svg?react";
import RobotLeftAxisY from "../assets/images/robot-left-axis-y.svg?react";

interface RobotProps {
    id: string;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    axesStyle: React.CSSProperties;
    // Animation control
    moveToHome: boolean;
    moveToPick: boolean;
    moveToAntecipation: boolean;
    moveToDrop: boolean;
}

export default function Robot({ id, bodyIndex, bodyStyle, axesStyle, moveToHome, moveToPick, moveToAntecipation, moveToDrop }: RobotProps) {
    const axesIndex = bodyIndex - 1;
    const axisXIndex = bodyIndex - 2;
    const axisYIndex = bodyIndex - 3;
    
    // Select robot svg based on ID
    let RobotBody, RobotAxisX, RobotAxisY: FunctionComponent<SVGProps<SVGSVGElement>>;
    if (id.includes("right")) {
        RobotBody = RobotRightBody;
        RobotAxisX = RobotRightAxisX;
        RobotAxisY = RobotRightAxisY;
    } else {
        RobotBody = RobotLeftBody;
        RobotAxisX = RobotLeftAxisX;
        RobotAxisY = RobotLeftAxisY;
    }

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
        // Move to home - Moving to (0, 0) (center, center)
        if (moveToHome && !homePostion) {
            setXOffset(0);
            setYOffset(0);
            return;
        }

        // Move to pick - Moving to (0, 100) (center, down)
        if (moveToPick && !pickPosition) {
            setXOffset(0);
            setYOffset(100);
            return;
        }

        // Move to anticipation - Moving to (50, 50) (half right, half down)
        if (moveToAntecipation && !anticipationPosition) {
            setXOffset(50);
            setYOffset(50);
            return;
        }

        // Move to drop - Moving to (100, 100) (right, down)
        if (moveToDrop && !dropPosition) {
            setXOffset(100);
            setYOffset(100);
            return;
        }
    }, [moveToHome, moveToPick, moveToAntecipation, moveToDrop]);

    return (
        <StyleRobot id={id} style={bodyStyle} $xOffset={xOffset} $yOffset={yOffset}>
            <RobotBody className="body" style={{ zIndex: bodyIndex }} />

            {/* Axes Animated - Axis Y is coupled in the Axis X */}
            <div className="axes" style={{...axesStyle, zIndex: axesIndex }}>
                <RobotAxisX className="axis-x" style={{ zIndex: axisXIndex }} />
                <RobotAxisY className="axis-y" style={{ zIndex: axisYIndex }} />
            </div>
        </StyleRobot>
    );
}