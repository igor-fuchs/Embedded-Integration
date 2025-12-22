import styled from "styled-components";

export const StyleContact = styled.section`
    width: 100%;
    background: #020617;
    display: flex;
    justify-content: center;
    align-items: center;

    .contact-container {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .contact-content {
        padding: 96px 80px;
        width: 100%;
        max-width: 896px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 48px;
    }

    .section-title {
        margin: 0;
        color: #60a5fa;
        text-align: center;

        font-size: 48px;
        font-weight: 700;
        line-height: 48px;
    }

    .section-subtitle {
        margin: 0;
        color: #94a3b8;
        text-align: center;

        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
        max-width: 672px;
    }

    .action-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        flex-wrap: wrap;
    }

    .btn-repository,
    .btn-contact {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 18px 32px;
        border-radius: 12px;

        font-size: 18px;
        font-weight: 600;
        line-height: normal;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;

        img {
            width: 19px;
            height: 20px;
            flex-shrink: 0;
        }
    }

    .btn-repository {
        background: rgba(0, 0, 0, 0);
        border: none;
        box-shadow: 0 0 20px 0 rgba(59, 130, 246, 0.3);

        &:hover {
            box-shadow: 0 0 30px 0 rgba(59, 130, 246, 0.5);
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(0);
        }
    }

    .btn-contact {
        background: rgba(0, 0, 0, 0);
        border: 2px solid #475569;

        svg {
            width: 18px;
            height: 18px;
        }

        &:hover {
            border-color: #60a5fa;
            background: rgba(96, 165, 250, 0.1);
        }

        &:active {
            background: rgba(96, 165, 250, 0.2);
        }
    }

    .collaboration-card {
        max-width: 672px;
        padding: 32px;
        border-radius: 16px;
        border: 1px solid #334155;
        background: rgba(30, 41, 59, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
        transition: all 0.3s ease;

        &:hover {
            border-color: #475569;
            background: rgba(30, 41, 59, 0.7);
        }
    }

    .card-title {
        margin: 0;
        color: #fff;
        text-align: center;

        font-size: 20px;
        font-weight: 600;
        line-height: normal;
    }

    .card-description {
        margin: 0;
        color: #cbd5e1;
        text-align: center;

        font-size: 16px;
        font-weight: 400;
        line-height: normal;
        max-width: 606px;
    }

    .social-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;

        button {
            padding: 0;
            margin: 0;
            border: none;
            background-color: transparent;
            cursor: pointer;
        }
    }

    .btn-linkedin {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        transition: all 0.3s ease;

        svg {
            width: 100%;
            height: 100%;
            transition: all 0.3s ease;
        }

        &:hover svg path {
            fill: #60a5fa;
        }

        &:active {
            transform: scale(0.95);
        }
    }

    @media (max-width: 1024px) {
        .section-title {
            font-size: 40px;
            line-height: 40px;
        }

        .section-subtitle {
            font-size: 18px;
            line-height: 26px;
        }
    }

    @media (max-width: 768px) {
        .contact-content {
            gap: 40px;
        }

        .section-title {
            font-size: 36px;
            line-height: 36px;
        }

        .section-subtitle {
            font-size: 17px;
            line-height: 24px;
        }

        .action-buttons {
            gap: 16px;
        }

        .btn-repository,
        .btn-contact {
            padding: 16px 28px;
            font-size: 17px;
        }

        .collaboration-card {
            padding: 28px;
            gap: 20px;
        }

        .card-title {
            font-size: 19px;
        }

        .card-description {
            font-size: 15px;
        }
    }

    @media (max-width: 640px) {
        .contact-content {
            gap: 36px;
            padding: 64px 40px;
        }

        .section-title {
            font-size: 32px;
            line-height: 32px;
        }

        .section-subtitle {
            font-size: 16px;
            line-height: 22px;
        }

        .action-buttons {
            flex-direction: column;
            width: 100%;
            gap: 14px;
        }

        .btn-repository,
        .btn-contact {
            width: 100%;
            padding: 15px 24px;
            font-size: 16px;
        }

        .collaboration-card {
            padding: 24px;
        }
    }

    @media (max-width: 480px) {
        .contact-content {
            gap: 32px;
            padding: 40px 20px;
        }

        .section-title {
            font-size: 28px;
            line-height: 28px;
        }

        .section-subtitle {
            font-size: 15px;
            line-height: 20px;
        }

        .btn-repository,
        .btn-contact {
            padding: 14px 20px;
            font-size: 15px;
        }

        .collaboration-card {
            padding: 20px;
            gap: 18px;
        }

        .card-title {
            font-size: 18px;
        }

        .card-description {
            font-size: 14px;
        }

        .social-icons {
            gap: 20px;
        }

        .social-link {
            width: 28px;
            height: 28px;
        }
    }
`;
