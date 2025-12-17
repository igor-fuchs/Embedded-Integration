import styled from "styled-components";

interface ConveyorProps {
    $animationDurationMs: number;
    $running: boolean;
}

export const StyleConveyor = styled.div<ConveyorProps>`
    overflow: hidden;

    .body {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }

    .belt {
        position: absolute;
        display: flex;
        flex-direction: column;
        animation: conveyorMove ${props => props.$animationDurationMs}ms linear infinite;
        animation-play-state: ${props => (props.$running ? 'running' : 'paused')};
    }

    @keyframes conveyorMove {
        0% {
            transform: translateY(50%);
        }
        100% {
            transform: translateY(0);
        }
    }
`;
