import { StyleHero } from "../.styles/Hero";
import StatusIndicator from "./StatusIndicator";
import PlayButtonIcon from '../../assets/icons/play-button-icon.svg';
import GithubIcon from '../../assets/icons/github-icon.svg';
import ArrowIcon from "../../assets/icons/arrow-icon.svg";
import { useTranslation } from "react-i18next";
import useScrollToSection from "../../hooks/useScrollToSection";

export default function Hero() {
    const { t } = useTranslation();
    return (
        <StyleHero>
            <div className="hero-background">
                <div className="gradient-overlay"></div>
                <div className="blur-circle blur-circle-left"></div>
                <div className="blur-circle blur-circle-right"></div>
                <div className="decorative-lines">
                    <div className="line line-left"></div>
                    <div className="line line-right"></div>
                </div>
            </div>
            
            <div className="hero-content">
                <div className="status-badge" >
                    <StatusIndicator id="System" status={true} colorOn="#4ade80" colorOff="#f70000" />
                    <span className="status-text">{t('SystemOnline')}</span>
                </div>
                
                <h1 className="hero-title">
                    <span className="title-white">Embedded</span>
                    <span className="title-blue"> Integration</span>
                </h1>
                
                <p className="hero-subtitle">
                    {t('HeroSubtitle')}
                    <span className="highlight"> Factory IO</span>,
                    <span className="highlight"> TIA Portal</span>, {t('And')}
                    <span className="highlight"> React</span>
                </p>
                
                <div className="cta-buttons">
                    <button className="btn-primary" onClick={() => useScrollToSection("Demo")}>
                        <img src={PlayButtonIcon} alt="Play Button" />
                        {t('ViewDemo')}
                    </button>
                    
                    <button className="btn-secondary" onClick={() => window.open("https://github.com/igor-fuchs", "_blank")}>
                        <img src={GithubIcon} alt="GitHub Icon" />
                        {t('ViewCode')}
                    </button>
                </div>
                
                <div className="scroll-indicator">
                    <img src={ArrowIcon} alt="Arrow Icon" />
                </div>
            </div>
        </StyleHero>
    )
}
