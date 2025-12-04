import styled from "styled-components";

interface ActuatorProps {
    $xOffset: number;
}

export const StyleActuator = styled.div<ActuatorProps>`
    .body {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }

    .axis {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transform: translateX(${(props) => props.$xOffset}px);
        transition: transform 400ms ease;
    }

    .piston, .rod{
        position: absolute;
        width: 100%;
        height: 100%;
    }
`;