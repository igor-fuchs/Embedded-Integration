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
        max-width: 1092px;
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
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        border-radius: 16px;
        background: #1e293b;
        overflow: hidden;
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
    }
`;
