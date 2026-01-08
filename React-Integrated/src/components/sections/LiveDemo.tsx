import { StyleLiveDemo } from "@styles/LiveDemo";
import { useTranslation } from "react-i18next";
import PlayFactory from "@simulation/PlayFactory";
import FactoryButtons from "@simulation/FactoryButtons";



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
                        <FactoryButtons />
                    </div>
                </div>
            </div>
        </StyleLiveDemo>
    );
}
