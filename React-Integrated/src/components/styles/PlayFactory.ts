import styled from "styled-components";

export const StylePlayFactory = styled.div<{ height: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 16px;
    background: #1e293b;
    overflow: hidden;
    width: 100%;
    height: ${(props) => props.height}px;

    .window-controls {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 8px;
        z-index: 1;
    }

    .control-dot {
        width: 12px;
        height: 12px;
        border-radius: 9999px;
    }

    .control-dot.green {
        background: #4ade80;
        opacity: 0.9232;
    }

    .control-dot.yellow {
        background: #facc15;
        opacity: 0.9491;
    }

    .control-dot.blue {
        background: #60a5fa;
        opacity: 0.597;
    }

    .demo-preview {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        z-index: 1;
    }

    .factory-background {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: 0;
    }

    .play-button {
        width: 96px;
        height: 96px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        background: linear-gradient(135deg, #2563eb 0%, #0891b2 70.71%);
        box-shadow: 0 0 20px 0 rgba(59, 130, 246, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 0 30px 0 rgba(59, 130, 246, 0.5);
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.98);
        }
    }

    .play-icon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        svg {
            width: 22.5px;
            height: 30px;
        }
    }

    .preview-title {
        margin: 0;
        color: #fff;
        text-align: center;

        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
    }

    .preview-description {
        margin: 0;
        max-width: 448px;
        color: #cbd5e1;
        text-align: center;

        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
    }

    .launch-button {
        padding: 14px 0 10px 0;
        width: 170px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        border: none;
        background: linear-gradient(90deg, #2563eb 0%, #0891b2 100%);
        color: #fff;
        text-align: center;

        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 0 20px 0 rgba(59, 130, 246, 0.4);
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(0);
        }
    }

    @media (max-width: 480px) {
        .play-button {
            width: 80px;
            height: 80px;
        }

        .preview-title {
            font-size: 20px;
            line-height: 28px;
        }

        .preview-description {
            font-size: 14px;
            line-height: 20px;
        }

        .launch-button {
            width: 150px;
            padding: 12px 0 8px 0;
            height: 44px;
            font-size: 15px;
        }
    }
`;
