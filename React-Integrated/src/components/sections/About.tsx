import { StyleAbout } from "../.styles/About";
import IndustrialIcon from "../../assets/icons/industrial-icon.svg";
import WebInterfaceIcon from "../../assets/icons/web-interface-icon.svg";
import logo from '../../assets/logo.svg';
import StatusIndicator from "./StatusIndicator";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();
    const gridRef = useRef<HTMLDivElement>(null);
    const [isVisibleGrid, setIsVisibleGrid] = useState(false);

    useEffect(() => {
        // Look for the element if it is in the viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisibleGrid) {
                    setIsVisibleGrid(true);
                }
            },
            {
                threshold: 0.2,
                rootMargin: "0px"
            }
        );

        if (gridRef.current) {
            observer.observe(gridRef.current);
        }
        
        // Cleanup function - works after to generate the element once time and it appears in the screen
        return () => {
            if (gridRef.current) {
                observer.unobserve(gridRef.current);
            }
        };
    }, [isVisibleGrid]);

    return (
        <StyleAbout id="About">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-header">
                        <h2 className="about-title">{t('AboutTheProject')}</h2>
                        <p className="about-description">
                            {t('AboutDescription')}
                        </p>
                    </div>

                    <div className="about-grid" ref={gridRef}>
                        <div className={`features-column ${isVisibleGrid ? 'animate' : ''}`}>
                            <div className="feature-card">
                                <div className="feature-content">
                                    <div className="feature-icon industrial">
                                        <img src={IndustrialIcon} alt="Industrial Icon" />
                                    </div>
                                    <div className="feature-text">
                                        <h3 className="feature-title">{t('IndustrialIntegration')}</h3>
                                        <p className="feature-description">
                                            {t('IndustrialIntegrationDescription')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-content">
                                    <div className="feature-icon web">
                                        <img src={WebInterfaceIcon} alt="Web Interface Icon" />
                                    </div>
                                    <div className="feature-text">
                                        <h3 className="feature-title">{t('WebInterface')}</h3>
                                        <p className="feature-description">
                                            {t('WebInterfaceDescription')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`diagram-column ${isVisibleGrid ? 'animate' : ''}`}>
                            <div className="diagram-card">
                                <div className="diagram-content">
                                    <div className="flow-header">
                                        <span className="flow-label factory">Factory IO</span>
                                        <div className="flow-line"></div>
                                        <span className="flow-label react">React</span>
                                    </div>

                                    <div className="central-icon-wrapper">
                                        <div className="central-icon">
                                            <img src={logo} alt="Logo Embedded Integration" />
                                        </div>
                                        <p className="portal-label">TIA Portal</p>
                                    </div>

                                    <div className="status-indicators">
                                        <div className="status-item">
                                            <StatusIndicator id="Simulation" status={true} colorOn="#4ade80" colorOff="#f70000" />
                                            <span className="status-text">{t('Simulation')}</span>
                                        </div>
                                        <div className="status-item">
                                            <StatusIndicator id="Processing" status={true} colorOn="#facc15" colorOff="#f70000" />
                                            <span className="status-text">{t('Processing')}</span>
                                        </div>
                                        <div className="status-item">
                                            <StatusIndicator id="Interface" status={true} colorOn="#60a5fa" colorOff="#f70000" />
                                            <span className="status-text">{t('Interface')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyleAbout>
    );
}
