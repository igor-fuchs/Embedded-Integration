import { StyleStatusIndicator } from "../.styles/StatusIndicator";

export interface StatusIndicatorProps {
    id: string;
    status: boolean;
    colorOn: string;
    colorOff: string;
}

export default function StatusIndicator({ id, status, colorOn, colorOff }: StatusIndicatorProps) {
    return (
        <StyleStatusIndicator color={status ? colorOn : colorOff} id={`StatusIndicator${id}`}>
            <div className="status-dot"></div>
        </StyleStatusIndicator>
    );
}