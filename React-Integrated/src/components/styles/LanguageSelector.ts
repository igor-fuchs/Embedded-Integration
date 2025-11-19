import styled from "styled-components";

export const StyleLanguageSelector = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 4px;
    cursor: pointer;

    .web-icon {
        width: 16px;
        height: 16px;
        & path {
            fill: #e5e7eb;
        }
    }

    .arrow-icon {
        width: 12.5px;
        height: 8px;

        & path {
            fill: #e5e7eb;
        }
    }

    .language-selector-text {
        color: #e5e7eb;
        margin: 0;
    }
`;
