import styled from "styled-components";

interface BigConveyorProps {
    $animationDurationMs: number;
    $firstRunning: boolean;
    $secondRunning: boolean;
    $firstHeight: number;
    $secondHeight: number;
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

    .first-belt-container,
    .second-belt-container {
        overflow: hidden;
    }

    .belt {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;

        &.first {
            animation: conveyorMove ${(props) => props.$animationDurationMs}ms
                linear infinite;
            animation-play-state: ${(props) =>
                props.$firstRunning ? "running" : "paused"};
        }

        &.second {
            animation: conveyorMove
                ${(props) =>
                    (props.$secondHeight / props.$firstHeight) *
                    props.$animationDurationMs}ms
                linear infinite; // condition to move copied from .tsx file (BigConveyor.tsx)
            animation-play-state: ${(props) =>
                props.$secondRunning ? "running" : "paused"};
        }
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
