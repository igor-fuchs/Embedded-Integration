import { StyleHero } from "./styles/Hero";
import PlayButtonIcon from '../assets/icons/play-button-icon.svg';
import GithubIcon from '../assets/icons/github-icon.svg';

export default function Hero() {
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
                <div className="status-badge">
                    <div className="status-indicator"></div>
                    <span className="status-text">System Online</span>
                </div>
                
                <h1 className="hero-title">
                    <span className="title-white">Embedded</span>
                    <span className="title-blue"> Integration</span>
                </h1>
                
                <p className="hero-subtitle">
                    Bridging industrial automation and web technology through seamless integration of
                    <span className="highlight"> Factory IO</span> ,
                    <span className="highlight"> TIA Portal</span> , and
                    <span className="highlight"> React</span>
                </p>
                
                <div className="cta-buttons">
                    <button className="btn-primary">
                        <img src={PlayButtonIcon} alt="Play Button" width="14" height="18" />
                        View Demo
                    </button>
                    
                    <button className="btn-secondary">
                        <img src={GithubIcon} alt="GitHub Icon" width="18" height="18" />
                        View Code
                    </button>
                </div>
                
                <div className="scroll-indicator">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9406 19.059C11.5265 19.6449 12.4781 19.6449 13.064 19.059L22.064 10.059C22.65 9.47305 22.65 8.52148 22.064 7.93555C21.4781 7.34961 20.5265 7.34961 19.9406 7.93555L12 15.8762L4.05935 7.94023C3.47341 7.3543 2.52185 7.3543 1.93591 7.94023C1.34998 8.52617 1.34998 9.47773 1.93591 10.0637L10.9359 19.0637L10.9406 19.059Z" fill="#94A3B8"/>
                    </svg>
                </div>
            </div>
        </StyleHero>
    )
}
