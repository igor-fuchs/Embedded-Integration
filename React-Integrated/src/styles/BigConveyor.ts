import styled from "styled-components";

interface BigConveyorProps {
    $animationDurationMs: number;
    $running: boolean;
}

export const StyleBigConveyor = styled.div<BigConveyorProps>`
    position: relative;
    overflow: hidden;

    .body,
    .arch,
    .boxes {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .belt {
        position: absolute;
        display: flex;
        flex-direction: column;
        animation: conveyorMove ${(props) => props.$animationDurationMs}ms
            linear infinite;
        animation-play-state: ${(props) =>
            props.$running ? "running" : "paused"};
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
