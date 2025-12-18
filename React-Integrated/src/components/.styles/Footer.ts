import styled from "styled-components";

export const StyleFooter = styled.footer`
    width: 100%;
    background: #0f172a;
    border-top: 1px solid #1e293b;
    display: flex;
    justify-content: center;
    align-items: center;

    .footer-container {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        padding: 48px 80px;
    }

    .brand-section {
        display: flex;
        align-items: center;
        gap: 12px;

        img {
            width: 32px;
            height: 32px;
        }
    }

    .brand-name {
        color: #60a5fa;
        
        font-size: 18px;
        font-weight: 600;
        line-height: 28px;
    }

    .footer-info {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
    }

    .copyright-text,
    .industry-text {
        color: #94a3b8;
        
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }

    .separator {
        color: #94a3b8;
        
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
    }

    @media (max-width: 768px) {

        .footer-content {
            flex-direction: column;
            gap: 20px;
            text-align: center;
            padding: 40px 50px;
        }

        .brand-section {
            justify-content: center;
        }

        .footer-info {
            justify-content: center;
        }
    }

    @media (max-width: 640px) {

        .footer-content {
            padding: 32px 30px;
        }

        .brand-name {
            font-size: 17px;
        }

        .footer-info {
            gap: 10px;
        }

        .copyright-text,
        .industry-text {
            font-size: 13px;
        }
    }

    @media (max-width: 480px) {

        .brand-name {
            font-size: 16px;
        }

        .brand-icon {
            width: 28px;
            height: 28px;
            padding: 5px 7px;

            svg {
                width: 12px;
                height: 12px;
            }
        }

        .footer-info {
            gap: 8px;
        }

        .copyright-text,
        .industry-text {
            font-size: 12px;
        }

        .footer-content {
            padding: 24px 10px;
        }
    }

    @media (max-width: 365px) {
        .separator{
            display: none;
        }
        .industry-text {
            display: none;
        }
        .footer-content{
            gap: 12px;
            padding: 20px 10px;
        }
    }


`;
