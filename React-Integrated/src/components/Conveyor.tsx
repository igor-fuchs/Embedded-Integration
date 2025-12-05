import { StyleConveyor } from './styles/Conveyor';
import Conveyor4mBody from '../assets/images/conveyor-4m-body.svg?react';
import Conveyor4mBelt from '../assets/images/conveyor-4m-belt.svg?react';
import { useEffect } from 'react';

interface ConveyorProps {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    beltStyle: React.CSSProperties;
    running: boolean;
}

export default function Conveyor({ id, ref, bodyIndex, bodyStyle, beltStyle, running }: ConveyorProps) {
    // Initializing values for data attributes
    const CONVEYOR_ANIMATION_DURATION_MS = 5000;
    const CONVEYOR_ANIMATION_DISTANCE_PERCENT = 50;

    useEffect(() => {
        if (!ref.current) return;
        ref.current.dataset.animationDurationMs = CONVEYOR_ANIMATION_DURATION_MS.toString();
        ref.current.dataset.animationDistancePercent = CONVEYOR_ANIMATION_DISTANCE_PERCENT.toString();
    }, []);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.style.animationPlayState = running ? 'running' : 'paused';
    }, [running]);

    const beltIndex = bodyIndex - 1;

    return (
        <StyleConveyor id={id} style={bodyStyle} $running={running}  >
            <Conveyor4mBody
                className='body'
                style={{ zIndex: bodyIndex }}
            />

            {/* Belt Animated */}
            <div ref={ref} className='belt' style={{ ...beltStyle, zIndex: beltIndex }}>
                <Conveyor4mBelt style={{ width: '100%', height: '100%' }} />
                <Conveyor4mBelt style={{ width: '100%', height: '100%' }} />
            </div>
        </StyleConveyor>
    );
}