import styled from "styled-components";

export const StyleLiveDemo = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0f172a;

    .demo-container {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .demo-content {
        padding: 64px 40px;
        width: 100%;
        max-width: 1152px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 64px;
    }

    .demo-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 13px;
        text-align: center;
    }

    .demo-title {
        margin: 0;
        color: #fff;
        
        font-size: 48px;
        font-weight: 700;
        line-height: 48px;
    }

    .demo-description {
        margin: 0;
        color: #94a3b8;
        
        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
    }

    .demo-card {
        padding: 33px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 32px;
        border-radius: 24px;
        border: 1px solid #334155;
        background: rgba(30, 41, 59, 0.5);
    }

    .demo-window {
        width: 100%;
        position: relative;
        border-radius: 16px;
        background: #1e293b;
        overflow: hidden;
    }

    .window-overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.2;
        pointer-events: none;
    }

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
        padding: 157px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
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

    .feature-cards {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 24px;
    }

    .feature-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
    }

    .feature-icon {
        width: 48px;
        height: 48px;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;

        svg {
            width: 20px;
            height: 16px;
        }
    }

    .feature-icon.control {
        background: #16a34a;
        padding: 12px 14px;
    }

    .feature-icon.assistant {
        background: #9333ea;
        padding: 12px 14px;
    }

    .feature-icon.info {
        background: #2563eb;
        padding: 12px 16px;

        svg {
            width: 16px;
            height: 16px;
        }
    }

    .feature-title {
        margin: 0;
        color: #fff;
        
        font-size: 18px;
        font-weight: 600;
        line-height: 28px;
    }

    .feature-description {
        margin: 0;
        color: #94a3b8;
        
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }

    @media (max-width: 1200px) {
        .demo-content {
            padding: 80px 60px;
        }
    }

    @media (max-width: 1024px) {
        .demo-title {
            font-size: 40px;
            line-height: 40px;
        }

        .demo-description {
            font-size: 18px;
            line-height: 26px;
        }

        .demo-content {
            gap: 48px;
            padding: 64px 40px;
        }
    }

    @media (max-width: 768px) {

        .demo-container {
            padding: 0;
        }

        .demo-content {
            gap: 32px;
            padding: 48px 24px;
        }

        .demo-title {
            font-size: 32px;
            line-height: 36px;
        }

        .demo-description {
            font-size: 16px;
            line-height: 24px;
        }

        .demo-card {
            padding: 24px;
        }

        .demo-preview {
            padding: 100px 16px;
        }

        .feature-cards {
            flex-wrap:wrap;
            gap: 32px;
        }

        .feature-card {
            width: 100%;
        }
    }

    @media (max-width: 640px) {
        .demo-content {
            padding: 40px 20px;
        }
    }

    @media (max-width: 480px) {

        .demo-title {
            font-size: 28px;
            line-height: 32px;
        }

        .demo-content{
            padding: 32px 16px;
        }

        .demo-description {
            font-size: 15px;
            line-height: 22px;
        }

        .demo-card {
            padding: 20px;
            gap: 24px;
        }

        .demo-preview {
            padding: 80px 12px;
        }

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
