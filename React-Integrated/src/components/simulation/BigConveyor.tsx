import { StyleBigConveyor } from "@styles/BigConveyor";
import Conveyor8mBody from "@assets/images/conveyor-8m-body.svg?react";
import Conveyor8mArch from "@assets/images/conveyor-8m-arch.svg?react";
import Conveyor8mBoxes from "@assets/images/conveyor-8m-boxes.svg?react";
import Conveyor8mFirstBelt from "@assets/images/conveyor-8m-first-belt.svg?react";
import Conveyor8mSecondBelt from "@assets/images/conveyor-8m-second-belt.svg?react";

import { useEffect } from "react";

interface BigConveyorProps {
    id: string;
    firstRef: React.RefObject<HTMLDivElement | null>;
    secondRef: React.RefObject<HTMLDivElement | null>;
    firstRunning: boolean;
    secondRunning: boolean;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    firstBeltStyle: React.CSSProperties;
    secondBeltStyle: React.CSSProperties;
    scaleFactor: number;
}

export default function BigConveyor({ id, firstRef, secondRef, firstRunning, secondRunning, bodyIndex, bodyStyle, firstBeltStyle, secondBeltStyle, scaleFactor }: BigConveyorProps) {
    // Part z-index needs to be bodyIndex + 1
    const archIndex = bodyIndex + 2;
    const boxesIndex = bodyIndex + 3;
    const beltIndex = bodyIndex - 1;

    const animationDurationMs = 5000;

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
        const refs = [firstRef, secondRef];

        refs.forEach(ref => {
            const container = ref.current;
            if (!container) return;

            // Find the element with data-id="ramp-height" directly inside the container
            const targetConveyor = container.querySelector<HTMLElement>(
                '[data-id="ramp-height"]'
            );
            if (!targetConveyor) return;

            // The animation of the conveyor moves 50% of its height in 10 seconds
            const conveyorHeight = targetConveyor.offsetHeight;
            const totalMovement = conveyorHeight * 0.5;

            // Speed in pixels per millisecond
            let speedMs: number;

            if (firstRef === ref) {
                speedMs = totalMovement / animationDurationMs ; // condition to move copied from .CSS file (StyleBigConveyor)
            } else {
                speedMs = totalMovement / (((secondBeltStyle.height as number) / (firstBeltStyle.height as number)) * animationDurationMs);

            }

            container.dataset.speedMs = speedMs.toString();
        });
    }, [scaleFactor]);

    return (
        <StyleBigConveyor
            id={id} style={bodyStyle} $animationDurationMs={animationDurationMs}
            $firstRunning={firstRunning} $secondRunning={secondRunning}
            $firstHeight={firstBeltStyle.height as number} $secondHeight={secondBeltStyle.height as number}
        >
            <Conveyor8mBody className="body" style={{ zIndex: bodyIndex }} />
            <Conveyor8mArch className="arch" style={{ zIndex: archIndex }} />
            <Conveyor8mBoxes className="boxes" style={{ zIndex: boxesIndex }} />

            {/* Belt Animated */}
            <div ref={secondRef} className="second-belt-container" style={{ ...secondBeltStyle, zIndex: beltIndex }}>
                <div data-id="ramp-height" className="belt second">
                    <Conveyor8mSecondBelt style={{ width: '100%', height: '100%' }} />
                    <Conveyor8mSecondBelt style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            <div ref={firstRef} className="first-belt-container" style={{ ...firstBeltStyle, zIndex: beltIndex }} >
                <div data-id="ramp-height" className="belt first">
                    <Conveyor8mFirstBelt style={{ width: '100%', height: '100%' }} />
                    <Conveyor8mFirstBelt style={{ width: '100%', height: '100%' }} />
                </div>
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