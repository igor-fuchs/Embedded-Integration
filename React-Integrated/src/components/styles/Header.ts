import styled from "styled-components";

export const StyleHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #020617;
    border-bottom: 1px solid #1e293b;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .header-nav {
        width: 100%;
        max-width: 1280px;
        padding: 16px 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .brand-container {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .brand-logo {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        flex-shrink: 0;
    }

    .brand-title {
        color: #60a5fa;
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        white-space: nowrap;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    .nav-link {
        display: flex;
        align-items: center;
    }

    #StyleLanguageSelector {
        color: #fff;
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

    .mobile-menu-icon {
        display: none;
        cursor: pointer;

        img {
            width: 20px;
            height: 20px;
            filter: invert(1);
        }
    }

    .mobile-menu {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: #1e293b;
        border: 1px solid #334155;
        border-radius: 8px;
        padding: 8px 0;
        min-width: 160px;
        box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 1001;
    }

    .mobile-nav-link {
        padding: 7px 20px;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #334155;
        }
    }

    .mobile-nav-text {
        color: #e5e7eb;
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
        transition: color 0.2s ease;

        &:hover {
            color: #60a5fa;
        }
    }

    @media (max-width: 768px) {
        .header-nav {
            padding: 12px 16px;
        }

        .header-content {
            gap: 1rem;
        }

        .brand-title {
            font-size: 16px;
            line-height: 24px;
        }

        .nav-links {
            gap: 16px;
        }

        .nav-text {
            font-size: 14px;
        }
    }

    @media (max-width: 520px) {
        .nav-links {
            display: none;
        }

        .mobile-menu-icon {
            display: flex;
            align-items: center;
        }

        .mobile-menu {
            display: block;
            right: 1px;
        }

        /* Balloon tail border */
        .mobile-menu::before {
            content: "";
            position: absolute;
            top: -22px;
            right: 13.5px;
            border-width: 11px;
            border-style: solid;
            border-color: transparent transparent #334155 transparent;
        }
        /* Balloon tail background */
        .mobile-menu::after {
            content: "";
            position: absolute;
            top: -19.5px;
            right: 14px;
            border-width: 10px;
            border-style: solid;
            border-color: transparent transparent #1e293b transparent;
        }

        .brand-title {
            font-size: 14px;
        }

        .brand-logo {
            width: 28px;
            height: 28px;
        }
    }
`;
