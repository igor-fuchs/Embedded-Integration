import styled from "styled-components";

export const StyleHero = styled.section`
    position: relative;
    width: 100%;
    height: 100vh;
    padding-top: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;

    .hero-background {
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            #020617 0%,
            #0f172a 35.36%,
            rgba(23, 37, 84, 0.5) 70.71%
        );
    }

    .blur-circle {
        position: absolute;
        border-radius: 9999px;
    }

    .blur-circle-left {
        width: 128px;
        height: 128px;
        background: rgba(59, 130, 246, 0.1);
        left: 40px;
        top: 80px;
        filter: blur(60px);
    }

    .blur-circle-right {
        width: 61px;
        height: 61px;
        background: rgba(6, 182, 212, 0.4);
        right: 158px;
        bottom: 206px;
        opacity: 0.34;
        filter: blur(40px);
    }

    .decorative-lines {
        position: absolute;
        inset: 0;
    }

    .line {
        position: absolute;
        width: 4px;
        opacity: 0.3;
    }

    .line-left {
        height: 128px;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            #60a5fa 50%,
            rgba(0, 0, 0, 0) 100%
        );
        left: 25%;
        top: 224px;
    }

    .line-right {
        height: 96px;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            #22d3ee 50%,
            rgba(0, 0, 0, 0) 100%
        );
        right: 34%;
        top: 448px;
    }

    .hero-content {
        position: relative;
        z-index: 1;
        max-width: 896px;
        width: 100%;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
    }

    .status-badge {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 13px 25px;
        border-radius: 9999px;
        border: 1px solid #334155;
        background: rgba(30, 41, 59, 0.5);
        backdrop-filter: blur(10px);
    }

    .status-text {
        color: #cbd5e1;
        
        font-size: 14px;
        font-weight: 400;
        line-height: normal;
    }

    .hero-title {
        margin: 0;
        
        font-size: 72px;
        font-weight: 700;
        line-height: 72px;
    }

    .title-white {
        color: #ffffff;
    }

    .title-blue {
        color: #60a5fa;
    }

    .hero-subtitle {
        margin: 0;
        color: #cbd5e1;
        
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
        max-width: 1073px;
    }

    .highlight {
        color: #60a5fa;
        font-weight: 600;
    }

    .cta-buttons {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .btn-primary,
    .btn-secondary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 19px 28px;
        border-radius: 12px;
        
        font-size: 18px;
        font-weight: 600;
        line-height: normal;
        cursor: pointer;
        transition: all 0.3s ease;

        img {
            width: 16px;
            height: 18px;
            flex-shrink: 0;
        }
    }

    .btn-primary {
        background: linear-gradient(90deg, #2563eb 0%, #0891b2 100%);
        border: none;
        color: #ffffff;
        box-shadow: 0 0 20px 0 rgba(59, 130, 246, 0.3);

        &:hover {
            box-shadow: 0 0 30px 0 rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(0);
        }
    }

    .btn-secondary {
        background: rgba(0, 0, 0, 0);
        border: 2px solid #475569;
        color: #ffffff;

        &:hover {
            border-color: #60a5fa;
            background: rgba(96, 165, 250, 0.1);
        }

        &:active {
            background: rgba(96, 165, 250, 0.2);
        }
    }

    .scroll-indicator {
        margin-top: 2rem;
        animation: bounce 2s ease-in-out infinite;

        img {
            width: 24px;
            height: 24px;
        }
    }

    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(10px);
        }
    }

    @media (max-width: 1024px) {
        .hero-title {
            font-size: 56px;
            line-height: 56px;
        }

        .hero-subtitle {
            font-size: 20px;
            line-height: 28px;
        }

        .line-left {
            left: 10%;
        }

        .line-right {
            right: 15%;
        }
    }

    @media (max-width: 768px) {
        .hero-content {
            padding: 0 1.5rem;
            gap: 1.5rem;
        }

        .hero-title {
            font-size: 40px;
            line-height: 48px;
        }

        .hero-subtitle {
            font-size: 18px;
            line-height: 26px;
        }

        .btn-primary,
        .btn-secondary {
            padding: 16px 24px;
            font-size: 16px;

            img {
                width: 14px;
                height: 16px;
            }
        }

        .blur-circle-left {
            width: 80px;
            height: 80px;
            left: 20px;
            top: 40px;
        }

        .blur-circle-right {
            width: 40px;
            height: 40px;
            right: 80px;
            bottom: 120px;
        }

        .line-left,
        .line-right {
            display: none;
        }
    }

    @media (max-width: 480px) {
        .hero-content {
            padding: 0 1rem;
            gap: 1.25rem;
        }

        .status-badge {
            padding: 10px 20px;
            gap: 12px;
        }

        .status-text {
            font-size: 12px;
        }

        .hero-title {
            font-size: 32px;
            line-height: 40px;
        }

        .hero-subtitle {
            font-size: 16px;
            line-height: 24px;
        }

        .cta-buttons {
            flex-direction: column;
            width: 100%;
            gap: 12px;
        }

        .btn-primary,
        .btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
            font-size: 15px;
        }
    }
`;
