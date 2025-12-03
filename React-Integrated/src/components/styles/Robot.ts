import styled from "styled-components";

interface RobotProps {
    $xOffset: number;
    $yOffset: number;
}

export const StyleRobot = styled.div<RobotProps>`
    .body {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }

    .axes {
        transform: translateX(${(props) => props.$xOffset}px);
        transition: transform 400ms ease;
    }

    .axis-x,
    .axis-y {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .axis-y {
        transform: translateY(${(props) => props.$yOffset}px);
        transition: transform 400ms ease;
    }
`;
