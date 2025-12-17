import styled from "styled-components";

export const StyleRobot = styled.div`
    .body {
        position: relative;
        width: 100%;
        height: 100%;
        display: block;
    }

    .axes {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .axis-x,
    .axis-y {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .gripper {
        position: absolute;
    }
`;
