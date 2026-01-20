import styled from "styled-components";

interface BigConveyorProps {
    $animationDurationMs: number;
    $animationDurationSecondBeltMs: number;
    $firstRunning: boolean;
    $secondRunning: boolean;
    $firstHeight: number;
    $secondHeight: number;
}

export const StyleBigConveyor = styled.div<BigConveyorProps>`
    position: relative;
    overflow: hidden;

    .stop-area {
        position: absolute;
        width: 30%;
        height: 10%;
        left: 0;

        &.metal {
            /* background-color: rgba(192, 192, 192, 0.5);
            z-index: 1000; */
        }

        &.green {
            /* background-color: rgba(0, 255, 0, 0.5);
            z-index: 1000; */
        }

        &.blue {
            /* background-color: rgba(0, 0, 255, 0.5);
            z-index: 1000; */
        }
    }

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
                ${(props) => props.$animationDurationSecondBeltMs}ms linear
                infinite; // condition to move copied from .tsx file (BigConveyor.tsx)
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
