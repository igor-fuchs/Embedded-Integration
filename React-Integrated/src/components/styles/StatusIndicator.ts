import styled from "styled-components";
import { hexToRgba } from '../../util/colors';

interface StatusIndicatorProps {
    color: string;
}

export const StyleStatusIndicator = styled.div<StatusIndicatorProps>`
    --status-color: ${props => hexToRgba(props.color, 0.7)};
    --status-color-transparent: ${props => hexToRgba(props.color, 0)};

    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 9999px;
        background: ${props => props.color};
        opacity: 0.9988;
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            box-shadow: 0 0 0 0 var(--status-color);
        }
        50% {
            opacity: 0.8;
            box-shadow: 0 0 0 8px var(--status-color-transparent);
        }
    }
`;
