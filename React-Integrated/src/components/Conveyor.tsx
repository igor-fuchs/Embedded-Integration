import { StyleConveyor } from './styles/Conveyor';
import Conveyor4mBody from '../assets/images/conveyor-4m-body.svg?react';
import Conveyor4mBelt from '../assets/images/conveyor-4m-belt.svg?react';

interface ConveyorProps {
    id: string;
    bodyIndex: number;
    bodyStyle: React.CSSProperties;
    beltStyle: React.CSSProperties;
    running: boolean;
}

export default function Conveyor({ id, bodyIndex, bodyStyle, beltStyle, running }: ConveyorProps) {
    const beltIndex = bodyIndex - 1;

    return (
        <StyleConveyor id={id} style={bodyStyle} $running={running}>
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