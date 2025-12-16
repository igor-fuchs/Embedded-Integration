import { StyleBigConveyor } from "./styles/BigConveyor";
import Conveyor8mBody from "../assets/images/conveyor-8m-body.svg?react";
import Conveyor8mBelt from "../assets/images/conveyor-8m-belt.svg?react";
import Conveyor8mArch from "../assets/images/conveyor-8m-arch.svg?react";
import Conveyor8mBoxes from "../assets/images/conveyor-8m-boxes.svg?react";
import { useEffect } from "react";

interface BigConveyorProps {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    running: boolean;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    beltStyle: React.CSSProperties;
    scaleFactor: number;
}

export default function BigConveyor({ id, ref, running, bodyIndex, bodyStyle, beltStyle, scaleFactor }: BigConveyorProps) {
    // Part z-index needs to be bodyIndex + 1
    const archIndex = bodyIndex + 2;
    const boxesIndex = bodyIndex + 3;
    const beltIndex = bodyIndex - 1;

    const animationDurationMs = 10000;

    useEffect(() => {
        if (!ref.current) return;

        // The animation of the conveyor moves 50% of its height in 5 seconds
        const conveyorHeight = ref.current.offsetHeight;
        const totalMovement = conveyorHeight * 0.5; // 50% of the height

        // Speed in pixels per millisecond
        ref.current.dataset.speedMs = (totalMovement / animationDurationMs).toString();
    }, [scaleFactor]); // Ensure it recalculates if scaleFactor changes

    return (
        <StyleBigConveyor id={id}  style={bodyStyle} $animationDurationMs={animationDurationMs} $running={running} >
            <Conveyor8mBody className="body" style={{ zIndex: bodyIndex }} />
            <Conveyor8mArch className="arch" style={{ zIndex: archIndex }} />
            <Conveyor8mBoxes className="boxes" style={{ zIndex: boxesIndex }} />

            {/* Belt Animated */}
            <div ref={ref} className="belt" style={{ ...beltStyle, zIndex: beltIndex }}>
                <Conveyor8mBelt style={{ width: '100%', height: '100%' }} />
                <Conveyor8mBelt style={{ width: '100%', height: '100%' }} />
            </div>
        </StyleBigConveyor>
    );
}