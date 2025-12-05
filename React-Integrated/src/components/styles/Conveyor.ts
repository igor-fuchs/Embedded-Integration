import styled from "styled-components";

interface ConveyorProps {
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
        animation: conveyorMove 5s linear infinite;
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
