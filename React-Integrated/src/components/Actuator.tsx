import { StyleActuator } from "./styles/Actuator";
import { useEffect, useState } from "react";
import ActuatorBody from "../assets/images/actuator-body.svg?react";
import ActuatorRod from "../assets/images/actuator-rod.svg?react";
import ActuatorPiston from "../assets/images/actuator-piston.svg?react";

interface ActuatorProps {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    axisStyle: React.CSSProperties;
    advance: boolean;
    retract: boolean;
    scaleFactor: number;
}

export default function Actuator({ id, ref, bodyIndex, bodyStyle, axisStyle, advance, retract, scaleFactor }: ActuatorProps) {
    // indexes
    const axisIndex = bodyIndex - 1;
    const rodIndex = bodyIndex - 2;
    const pistonIndex = bodyIndex - 2;

    // Aux
    const animationDurationMs = 400;

    // Movement state
    const [xOffset, setXOffset] = useState(0);

    useEffect(() => {
        if (!ref.current) return;

        // NOTE: Movement maximum 0 and 42 px
        const advancePosition = 42;
        const retractPosition = 0;

        ref.current.dataset.retractPosition = `${retractPosition}`;
        ref.current.dataset.advancePosition = `${advancePosition}`;
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        // Get current positions
        const numberAdvancePosition = Number(ref.current.dataset.advancePosition);;
        const numberRetractPosition = Number(ref.current.dataset.retractPosition);

        // Determine positions
        const advancePosition = xOffset == numberAdvancePosition;
        const retractPosition = xOffset == numberRetractPosition;

        // Move to advance position
        if (advance && !advancePosition) {
            setXOffset(numberAdvancePosition);
            return;
        }

        // Move to retract position
        if (retract && !retractPosition) {
            setXOffset(numberRetractPosition);
            return;
        }

    }, [advance, retract]);

    return (
        <StyleActuator id={id} style={bodyStyle} >
            <ActuatorBody className="body" style={{ zIndex: bodyIndex }} />

            {/* Axis Animated */}
            <div
                ref={ref}
                className="axis"
                style={{
                    ...axisStyle,
                    zIndex: axisIndex,
                    transform: `translateX(${xOffset * scaleFactor}px)`,
                    transition: `transform ${animationDurationMs}ms ease`
                }}
            >
                <ActuatorRod className="rod" style={{ zIndex: rodIndex }} />
                <ActuatorPiston className="piston" style={{ zIndex: pistonIndex }} />
            </div>
        </StyleActuator>
    );
}