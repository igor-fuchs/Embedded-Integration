import styled from "styled-components";

export const StyleAbout = styled.section`
    width: 100%;
    min-height: calc(100vh - var(--header-height)); // Adjust for header height
    background: #0f172a;
    display: flex;
    justify-content: center;
    align-items: center;

    .about-container {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .about-content {
        padding: 60px 40px;
        width: 100%;
        max-width: 1152px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 64px;
    }

    .about-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 13px;
    }

    .about-title {
        margin: 0;
        color: #fff;
        text-align: center;
        font-size: 48px;
        font-weight: 700;
        line-height: 48px;
    }

    .about-description {
        margin: 0;
        color: #94a3b8;
        text-align: center;

        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
        max-width: 768px;
    }

    .about-grid {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 48px;
    }

    .features-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 32px;
        flex: 1;
        max-width: 552px;
    }

    .features-column.animate .feature-card {
        animation: slideInFromLeft 1s ease-out forwards;
    }

    .diagram-column.animate .diagram-card {
        animation: slideInFromRight 1s ease-out forwards;
        @media(max-width: 1200px) {
            animation: slideInFromLeft 1s ease-out forwards;
        }
    }

    .diagram-column.animate .features-column.animate {
        animation-delay: 0.1s;
    }

    .diagram-column.animate .features-column.animate {
        animation-delay: 0.3s;
    }

    

    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .feature-card {
        display: flex;
        padding: 33px;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        border: 1px solid #334155;
        background: rgba(30, 41, 59, 0.5);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateX(-100px);

        &:hover {
            border-color: #475569;
            background: rgba(30, 41, 59, 0.7);
            transform: translateY(-2px);
        }
    }

    .feature-content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 16px;
    }

    .feature-icon {
        width: calc(48px - 24px);
        height: calc(48px - 24px);
        flex-shrink: 0;
        display: flex;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 12px;

        &.industrial {
            background: #2563eb;
        }

        &.web {
            background: #0891b2;
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .feature-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 12px;
    }

    .feature-title {
        margin: 0;
        color: #fff;
        
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
    }

    .feature-description {
        margin: 0;
        color: #cbd5e1;
        
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        text-align: left;
    }

    .diagram-column {
        flex: 1;
        max-width: 552px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .diagram-card {
        width: 100%;
        display: flex;
        padding: 33px;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        border: 1px solid #334155;
        background: rgba(30, 41, 59, 0.3);
        transition: all 0.3s ease;
        opacity: 0;

        &:hover {
            border-color: #475569;
            background: rgba(30, 41, 59, 0.5);
        }
    }

    .diagram-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 24px;
    }

    .flow-header {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 14.625px;
    }

    .flow-label {
        
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;

        &.factory {
            color: #60a5fa;
        }

        &.react {
            color: #22d3ee;
        }
    }

    .flow-line {
        flex: 1;
        height: 2px;
        position: relative;
        border-radius: 2px;
        overflow: hidden;
        background: linear-gradient(90deg, #60a5fa 0%, #22d3ee 100%);
        background-size: 200% 100%;
        animation: flowMove 2.8s linear infinite;
    }

    @keyframes flowMove {
        0% { background-position: -0% -50%; }
        100% { background-position: -200% -50%; }
    } 

    .central-icon-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
    }

    .central-icon {
        width: 64px;
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 9999px;
        background: linear-gradient(135deg, #2563eb 0%, #0891b2 70.71%);
        box-shadow: 0 0 20px 0 rgba(37, 99, 235, 0.3);

        img {
            width: 20px;
            height: 20px;
        }
    }

    .portal-label {
        margin: 0;
        color: #cbd5e1;
        text-align: center;
        
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
    }

    .status-indicators {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 16px;
    }

    .status-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 14px;
    }

    .status-text {
        color: #94a3b8;
        text-align: center;
        
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
    }

    @media (max-width: 1200px) {

        .about-content {
            padding: 80px 60px;
        }

        .about-grid {
            flex-direction: column;
            gap: 32px;
        }

        .features-column,
        .diagram-column {
            max-width: 100%;
            width: 100%;
        }
    }

    @media (max-width: 1024px) {

        .about-content {
            gap: 48px;
            padding: 48px 24px;
        }

        .about-title {
            font-size: 40px;
            line-height: 40px;
        }

        .about-description {
            font-size: 18px;
            line-height: 26px;
        }

        

        
    }

    @media (max-width: 768px) {

        .about-content {
            gap: 40px;
        }

        .about-title {
            font-size: 32px;
            line-height: 36px;
        }

        .about-description {
            font-size: 16px;
            line-height: 24px;
        }

        .features-column {
            gap: 24px;
        }

        .feature-card,
        .diagram-card {
            padding: 24px;
        }

        .feature-title {
            font-size: 18px;
            line-height: 26px;
        }

        .feature-description {
            font-size: 15px;
            line-height: 24px;
        }
    }

    @media (max-width: 640px) {

        .about-content {
            gap: 32px;
            padding: 40px 20px;
        }

        .about-title {
            font-size: 28px;
            line-height: 32px;
        }

        .about-description {
            font-size: 15px;
            line-height: 22px;
        }

        .feature-content {
            flex-direction: column;
            gap: 12px;
        }

        .feature-icon {
            width: 40px;
            height: 40px;
        }

        .central-icon {
            width: 56px;
            height: 56px;
        }

        .status-indicators {
            flex-wrap: wrap;
            gap: 12px;
        }

        .status-item {
            min-width: 100px;
        }
    }

    @media (max-width: 480px) {

        .about-content {
            padding: 32px 16px;
        }

        .about-title {
            font-size: 24px;
            line-height: 28px;
        }

        .about-description {
            font-size: 14px;
            line-height: 20px;
        }

        .feature-card,
        .diagram-card {
            padding: 20px;
        }

        .flow-label {
            font-size: 14px;
        }

        .portal-label {
            font-size: 14px;
        }
    }
`;
