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
}

export default function Conveyor({ id, ref, bodyIndex, bodyStyle, beltStyle, running }: ConveyorProps) {
    const beltIndex = bodyIndex - 1;
    const animationDurationMs = 5000;

    useEffect(() => {
        if (!ref.current) return;

        // The animation of the conveyor moves 50% of its height in 5 seconds
        const conveyorHeight = ref.current.offsetHeight;
        const totalMovement = conveyorHeight * 0.5; // 50% of the height

        // Speed in pixels per millisecond
        ref.current.dataset.speedMs = (totalMovement / animationDurationMs).toString();
    }, []);


    useEffect(() => {
        if (!ref.current) return;
        ref.current.style.animationPlayState = running ? 'running' : 'paused';
    }, [running]);

    return (
        <StyleConveyor id={id} style={bodyStyle} $animationDurationMs={animationDurationMs} >
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