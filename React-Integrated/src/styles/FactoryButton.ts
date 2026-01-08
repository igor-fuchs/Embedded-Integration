import styled from "styled-components";

export const StyleFactoryButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;

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

    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 32px;

        .feature-card {
            width: 100%;
        }
    }
`;