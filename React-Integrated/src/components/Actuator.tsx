import { StyleActuator } from "./styles/Actuator";
import { useEffect, useState } from "react";
import ActuatorBody from "../assets/images/actuator-body.svg?react";
import ActuatorRod from "../assets/images/actuator-rod.svg?react";
import ActuatorPiston from "../assets/images/actuator-piston.svg?react";

interface ActuatorProps {
    id: string;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    axisStyle: React.CSSProperties;
    advance: boolean;
    retract: boolean;
}

export default function Actuator({ id, bodyIndex, bodyStyle, axisStyle, advance, retract }: ActuatorProps) {
    const axisIndex = bodyIndex - 1;
    const rodIndex = bodyIndex - 2;
    const pistonIndex = bodyIndex - 2;

    // Track current X offset so we can stop exactly where we are
    const [xOffset, setXOffset] = useState(0);

    useEffect(() => {
        // Determine positions
        const advancePosition = xOffset == 100;
        const retractPosition = xOffset == 0;

        // Move to advance position
        if (advance && !advancePosition) {
            setXOffset(41);
            return;
        }

        // Move to retract position
        if (retract && !retractPosition) {
            setXOffset(0);
            return;
        }

    }, [advance, retract]);

    return (
        <StyleActuator id={id} style={bodyStyle} $xOffset={xOffset}>
            <ActuatorBody className="body" style={{ zIndex: bodyIndex }} />

            {/* Axis Animated */}
            <div className="axis" style={{ ...axisStyle, zIndex: axisIndex }}>
                <ActuatorRod className="rod" style={{ zIndex: rodIndex }} />
                <ActuatorPiston className="piston" style={{ zIndex: pistonIndex }} />
            </div>
        </StyleActuator>
    );
}