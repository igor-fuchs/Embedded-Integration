import styled from "styled-components";

interface PartProps {
    $xOffset: number;
    $yOffset: number;
}

export const StylePart = styled.div.attrs<PartProps>((props) => ({
    style: {
        transform: `translate(${props.$xOffset}px, ${props.$yOffset}px)`,
    },
}))`

    .part {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;
