import { StyleBigConveyor } from "./styles/BigConveyor";
import Conveyor8mBody from "../assets/images/conveyor-8m-body.svg?react";
import Conveyor8mBelt from "../assets/images/conveyor-8m-belt.svg?react";
import Conveyor8mArch from "../assets/images/conveyor-8m-arch.svg?react";
import Conveyor8mBoxes from "../assets/images/conveyor-8m-boxes.svg?react";

interface BigConveyorProps {
    id: string;
    running: boolean;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    beltStyle: React.CSSProperties;
}

export default function BigConveyor({ id, running, bodyIndex, bodyStyle, beltStyle }: BigConveyorProps) {
    // Part z-index needs to be bodyIndex + 1
    const archIndex = bodyIndex + 2;
    const boxesIndex = bodyIndex + 3;
    const beltIndex = bodyIndex - 1;

    return (
        <StyleBigConveyor id={id} style={bodyStyle} $running={running}>
            <Conveyor8mBody className="body" style={{ zIndex: bodyIndex }} />
            <Conveyor8mArch className="arch" style={{ zIndex: archIndex }} />
            <Conveyor8mBoxes className="boxes" style={{ zIndex: boxesIndex }} />

            {/* Belt Animated */}
            <div className="belt" style={{ ...beltStyle, zIndex: beltIndex }}>
                <Conveyor8mBelt style={{ width: '100%', height: '100%' }} />
                <Conveyor8mBelt style={{ width: '100%', height: '100%' }} />
            </div>
        </StyleBigConveyor>
    );
}