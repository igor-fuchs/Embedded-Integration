import styled from "styled-components";

export const StyleBigConveyor = styled.div`
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
    }
`;
