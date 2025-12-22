import { StyleLiveDemo } from "@styles/LiveDemo";
import { useTranslation } from "react-i18next";
import { PlayFactory } from "@simulation/PlayFactory";

import ConnectionIcon from "@assets/icons/connection-icon.svg";
import AssistantIcon from "@assets/icons/ai-assistant-icon.svg";
import InfoIcon from "@assets/icons/information-icon.svg";

export default function LiveDemo() {
    const { t } = useTranslation();

    return (
        <StyleLiveDemo id="Demo">
            <div className="demo-container">
                <div className="demo-content">
                    <div className="demo-header">
                        <h2 className="demo-title">{t('LiveDemo')}</h2>
                        <p className="demo-description">
                            {t('LiveDemoDescription')}
                        </p>
                    </div>

                    {/* Simulation Card */}
                    <div className="demo-card">
                        <PlayFactory />

                        <div className="feature-cards">
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
                        </div>
                    </div>
                </div>
            </div>
        </StyleLiveDemo>
    );
}
