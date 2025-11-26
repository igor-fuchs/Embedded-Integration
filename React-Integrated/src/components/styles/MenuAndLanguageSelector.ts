import styled from "styled-components";

export const StyleLanguageSelector = styled.div`
    position: relative;
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
        transition: transform 0.2s ease;

        & path {
            fill: #e5e7eb;
        }

        &.open {
            transform: rotate(180deg);
        }
    }

    .language-selector-text {
        color: #e5e7eb;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .language-selector-header {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
    }
`;

export const StyleDropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background-color: #1f2937;
    border: 1px solid #374151;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    min-width: 180px;
    z-index: 1000;
    overflow: hidden;
`;

export const StyleDropDownItem = styled.div`
    display: flex;
    align-items: center;
    color: #e5e7eb;
    gap: 10px;
    height: 20px;
    padding: 12px 16px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: #374151;
    }

    img {
        width: 20px;
        height: 14px;
        vertical-align: middle;
    }
`;
