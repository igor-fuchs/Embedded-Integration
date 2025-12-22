import { StyleBigConveyor } from "@styles/BigConveyor";
import Conveyor8mBody from "@assets/images/conveyor-8m-body.svg?react";
import Conveyor8mBelt from "@assets/images/conveyor-8m-belt.svg?react";
import Conveyor8mArch from "@assets/images/conveyor-8m-arch.svg?react";
import Conveyor8mBoxes from "@assets/images/conveyor-8m-boxes.svg?react";
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

    const rampLeftInPixels = 57;
    const rampTopInPixels = {
        a: 20,
        b: 93,
        c: 166,
    }
    const rampStyle = {
        position: "absolute" as const,
        width: 30 * scaleFactor,
        height: 50 * scaleFactor,
        //backgroundColor: "black",
        //zIndex: 100,
    };

    useEffect(() => {
        if (!ref.current) return;

        // The animation of the conveyor moves 50% of its height in 5 seconds
        const conveyorHeight = ref.current.offsetHeight;
        const totalMovement = conveyorHeight * 0.5; // 50% of the height

        // Speed in pixels per millisecond
        ref.current.dataset.speedMs = (totalMovement / animationDurationMs).toString();
    }, [scaleFactor]); // Ensure it recalculates if scaleFactor changes

    return (
        <StyleBigConveyor id={id} style={bodyStyle} $animationDurationMs={animationDurationMs} $running={running} >
            <Conveyor8mBody className="body" style={{ zIndex: bodyIndex }} />
            <Conveyor8mArch className="arch" style={{ zIndex: archIndex }} />
            <Conveyor8mBoxes className="boxes" style={{ zIndex: boxesIndex }} />

            {/* Belt Animated */}
            <div ref={ref} className="belt" style={{ ...beltStyle, zIndex: beltIndex }}>
                <Conveyor8mBelt style={{ width: '100%', height: '100%' }} />
                <Conveyor8mBelt style={{ width: '100%', height: '100%' }} />
            </div>

            {/* Do not change the data-id, it is being used in the file Part.tsx */}
            <div data-id="ramp-a" className="ramp-segment ramp-a" style={{ ...rampStyle, top: rampTopInPixels.c * scaleFactor, left: rampLeftInPixels * scaleFactor }} />
            <div data-id="ramp-b" className="ramp-segment ramp-b" style={{ ...rampStyle, top: rampTopInPixels.b * scaleFactor, left: rampLeftInPixels * scaleFactor }} />
            <div data-id="ramp-c" className="ramp-segment ramp-c" style={{ ...rampStyle, top: rampTopInPixels.a * scaleFactor, left: rampLeftInPixels * scaleFactor }} />

            <div data-id="ramp-a-end" className="ramp-segment ramp-a end" style={{ ...rampStyle, top: (rampTopInPixels.c + 30) * scaleFactor, left: (rampLeftInPixels + 94) * scaleFactor }} />
            <div data-id="ramp-b-end" className="ramp-segment ramp-b end" style={{ ...rampStyle, top: (rampTopInPixels.b + 30) * scaleFactor, left: (rampLeftInPixels + 94) * scaleFactor }} />
            <div data-id="ramp-c-end" className="ramp-segment ramp-c end" style={{ ...rampStyle, top: (rampTopInPixels.a + 30) * scaleFactor, left: (rampLeftInPixels + 94) * scaleFactor }} />
        </StyleBigConveyor>
    );
}