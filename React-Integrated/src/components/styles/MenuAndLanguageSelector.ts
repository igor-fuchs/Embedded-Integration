import styled from "styled-components";

export const StyleMenuAndLanguageSelector = styled.div`
    &.nav-links {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .nav-link {
        display: flex;
        align-items: center;
    }

    .nav-text {
        color: #e5e7eb;
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        transition: color 0.2s ease;

        &:hover {
            color: #60a5fa;
        }
    }

    .mobile-nav-link {
        padding: 7px 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #334155;
        }
    }

    .mobile-nav-text {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #e5e7eb;
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
        transition: color 0.2s ease;

        &.back-button {
            font-weight: 600;
            font-size: 14px;
            padding-bottom: 3px;
        }

        &:hover {
            color: #60a5fa;
        }
    }

    .previous-icon {
        width: 14px;
        height: 14px;
        filter: invert();
    }

    .language-selector {
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
    }

    .dropdown-menu {
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
    }

    .dropdown-item {
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
    }

    @media (max-width: 980px) {
        &.nav-links {
            gap: 16px;
        }

        .nav-text,
        .language-selector-text {
            font-size: 14px;
        }

        .dropdown-item {
            font-size: 14px;
        }

        .web-icon {
            width: 14px;
            height: 14px;
        }

        .arrow-icon {
            width: 10.5px;
            height: 6px;
        }
    }

    @media (max-width: 730px) {
        &.nav-links {
            display: none;
        }

        .language-selector {
            justify-content: flex-start;
        }

        .language-selector-header {
            gap: 8px;
        }

        .web-icon {
            display: none;
        }

        .language-selector-text {
            color: #e5e7eb;
            font-size: 16px;
            font-weight: 400;
            line-height: normal;
            transition: color 0.2s ease;

            &:hover {
                color: #60a5fa;
            }
        }
    }
`;
