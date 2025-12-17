import styled from "styled-components";

export const StyleTechnologies = styled.section`
    width: 100%;
    min-height: calc(100vh - var(--header-height));
    background: #020617;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .technologies-container {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .technologies-content {
        width: 100%;
        max-width: calc(
            1152px + 160px
        ); // 160px width from .technologies-grid::before and ::after
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 64px;
    }

    .technologies-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 13px;
    }

    .technologies-title {
        margin: 0;
        color: #60a5fa;
        text-align: center;

        font-size: 48px;
        font-weight: 700;
        line-height: 48px;
    }

    .technologies-description {
        margin: 0;
        color: #94a3b8;
        text-align: center;

        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
        max-width: 768px;
    }

    .technologies-grid {
        width: 100%;
        position: relative;
        overflow: hidden;

        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 80px;
            pointer-events: none;
            z-index: 1;
        }

        &::before {
            left: 0;
            background: linear-gradient(
                to right,
                #020617 0%,
                rgba(2, 6, 23, 0.85) 40%,
                rgba(2, 6, 23, 0) 100%
            );
        }

        &::after {
            right: 0;
            background: linear-gradient(
                to left,
                #020617 0%,
                rgba(2, 6, 23, 0.85) 40%,
                rgba(2, 6, 23, 0) 100%
            );
        }
    }

    .technologies-scroll {
        width: 100%;
        overflow-x: hidden;
        user-select: none;
    }

    .technologies-track {
        display: flex;
        gap: 32px;
        padding: 8px;
        transition: transform 0.1s ease-out;
        will-change: transform;
        position: relative;
        z-index: 0;
    }

    .tech-card {
        display: flex;
        flex-direction: column;
        padding: 33px;
        border-radius: 16px;
        border: 1px solid #334155;
        background: rgba(30, 41, 59, 0.5);
        transition: all 0.3s ease;
        min-width: 320px;
        max-width: 320px;
        flex-shrink: 0;
        pointer-events: none;
    }

    .tech-icon {
        --icon-radius: 16px;

        width: 64px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: var(--icon-radius);
        margin-bottom: 24px;
        box-sizing: border-box;

        &.factory-io {
            background: linear-gradient(135deg, #f97316 0%, #ef4444 70.71%);
        }

        &.tia-portal {
            background: linear-gradient(135deg, #22c55e 0%, #10b981 70.71%);
        }

        &.react {
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 70.71%);
        }

        &.dotnet {
            padding: 0;
            img {
                width: 100%;
                height: 100%;
                border-radius: var(--icon-radius);
            }
        }

        &.siemens-plc {
            background: linear-gradient(135deg, #a855f7 0%, #ec4899 70.71%);
        }

        &.pixel-art {
            background: linear-gradient(135deg, #eab308 0%, #f97316 70.71%);
        }
    }

    .tech-title {
        margin: 0 0 12px 0;
        color: #fff;

        font-size: 20px;
        font-weight: 600;
        line-height: normal;
    }

    .tech-description {
        margin: 0;
        color: #cbd5e1;

        font-size: 16px;
        font-weight: 400;
        line-height: normal;
    }

    @media (max-width: 1200px) {
        .technologies-grid {
            &::before,
            &::after {
                width: 200px;
            }
        }

        .technologies-track {
            gap: 24px;
        }
    }

    @media (max-width: 1024px) {
        .technologies-content {
            gap: 48px;
        }

        .technologies-grid {
            &::before,
            &::after {
                width: 100px;
            }
        }

        .technologies-title {
            font-size: 40px;
            line-height: 40px;
        }

        .technologies-description {
            font-size: 18px;
            line-height: 26px;
        }

        .technologies-track {
            gap: 24px;
        }

        .tech-card {
            min-width: 280px;
            max-width: 280px;
        }
    }

    @media (max-width: 768px) {
        .technologies-content {
            gap: 40px;
        }

        .technologies-title {
            font-size: 32px;
            line-height: 36px;
        }

        .technologies-description {
            font-size: 16px;
            line-height: 24px;
        }

        .technologies-track {
            gap: 20px;
        }

        .tech-card {
            padding: 24px;
            min-width: 260px;
            max-width: 260px;
        }

        .tech-icon {
            width: 56px;
            height: 56px;
            padding: 14px;
            margin-bottom: 20px;
        }

        .tech-title {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .tech-description {
            font-size: 15px;
        }
    }

    @media (max-width: 640px) {
        .technologies-content {
            gap: 32px;
        }

        .technologies-grid {
            &::before,
            &::after {
                width: 60px;
            }
        }

        .technologies-title {
            font-size: 28px;
            line-height: 32px;
        }

        .technologies-description {
            font-size: 15px;
            line-height: 22px;
        }

        .tech-card {
            padding: 20px;
            min-width: 240px;
            max-width: 240px;
        }
    }

    @media (max-width: 480px) {
        .technologies-title {
            font-size: 24px;
            line-height: 28px;
        }

        .technologies-description {
            font-size: 14px;
            line-height: 20px;
        }

        .tech-card {
            min-width: 220px;
            max-width: 220px;
        }

        .tech-icon {
            width: 48px;
            height: 48px;
            padding: 12px;
        }
    }
`;
