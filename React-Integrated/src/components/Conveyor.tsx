import { useEffect } from 'react';
import { StyleConveyor } from './styles/Conveyor';
import Conveyor4mBody from '../assets/images/conveyor-4m-body.svg?react';
import Conveyor4mBelt from '../assets/images/conveyor-4m-belt.svg?react';


interface ConveyorProps {
    id: string;
    ref: React.RefObject<HTMLDivElement | null>;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    beltStyle: React.CSSProperties;
    running: boolean;
    scaleFactor: number;
}

export default function Conveyor({ id, ref, bodyIndex, bodyStyle, beltStyle, running, scaleFactor }: ConveyorProps) {
    const beltIndex = bodyIndex - 1;
    const animationDurationMs = 5000;

    const classNameBelt = 'belt';

    useEffect(() => {
        if (!ref.current) return;

        // The animation of the conveyor moves 50% of its height in 5 seconds
        const conveyorEl = ref.current.querySelector(`.${classNameBelt}`) as HTMLElement;
        const totalMovement = conveyorEl.offsetHeight * 0.5; // 50% of the height

        // Speed in pixels per millisecond
        ref.current.dataset.speedMs = (totalMovement / animationDurationMs).toString();
    }, [scaleFactor]); // Ensure it recalculates if scaleFactor changes

    return (
        <StyleConveyor id={id} ref={ref} style={bodyStyle} $animationDurationMs={animationDurationMs} $running={running} >
            <Conveyor4mBody
                className='body'
                style={{ zIndex: bodyIndex }}
            />

            {/* Belt Animated */}
            <div className='belt' style={{ ...beltStyle, zIndex: beltIndex }}>
                <Conveyor4mBelt style={{ width: '100%', height: '100%' }} />
                <Conveyor4mBelt style={{ width: '100%', height: '100%' }} />
            </div>
        </StyleConveyor>
    );
}