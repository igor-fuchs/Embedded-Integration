import { useTranslation } from "react-i18next";

import ConnectionIcon from "@assets/icons/connection-icon.svg";
import AssistantIcon from "@assets/icons/ai-assistant-icon.svg";
import InfoIcon from "@assets/icons/information-icon.svg";
import { StyleFactoryButtons } from "@styles/FactoryButton";

export default function FactoryButtons() {
    const { t } = useTranslation();

    return (
        <StyleFactoryButtons className="feature-cards">
            <div className="feature-card">
                <div className="feature-icon control">
                    <img src={ConnectionIcon} alt="Control Signals Icon" />
                </div>
                <h4 className="feature-title">{t('ControlSignals')}</h4>
                <p className="feature-description">{t('ControlSignalsDescription')}</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon assistant">
                    <img src={AssistantIcon} alt="AI Assistant Icon" />
                </div>
                <h4 className="feature-title">{t('AIAssistant')}</h4>
                <p className="feature-description">{t('AIAssistantDescription')}</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon info">
                    <img src={InfoIcon} alt="Information Icon" />
                </div>
                <h4 className="feature-title">{t('Information')}</h4>
                <p className="feature-description">{t('InformationDescription')}</p>
            </div>
        </StyleFactoryButtons>
    );
}