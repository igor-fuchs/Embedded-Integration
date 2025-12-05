import styled from "styled-components";

interface PartProps {
    $xOffset: number;
    $yOffset: number;
}

export const StylePart = styled.div<PartProps>`
    .part {
        width: 100%;
        height: 100%;
        transform: translate(
            ${(props) => props.$xOffset}px,
            ${(props) => props.$yOffset}px
        );
    }
`;
