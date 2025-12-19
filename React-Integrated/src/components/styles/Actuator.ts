import styled from "styled-components";

export const StyleActuator = styled.div`
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
    }

    .piston, .rod{
        position: absolute;
        width: 100%;
        height: 100%;
    }
`;