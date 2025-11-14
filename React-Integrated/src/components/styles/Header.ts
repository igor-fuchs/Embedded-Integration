import styled from "styled-components";

export const StyleHeader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #020617;
    border-bottom: 1px solid #1E293B;
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
        color: #60A5FA;
        font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
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

    .nav-text {
        color: #E5E7EB;
        font-family: Inter, -apple-system, Roboto, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        transition: color 0.2s ease;

        &:hover {
            color: #60A5FA;
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

    @media (max-width: 480px) {
        .brand-title {
            display: none;
        }

        .nav-links {
            gap: 12px;
        }

        .nav-text {
            font-size: 12px;
        }
    }
`;
