import { StyleLiveDemo } from "./styles/LiveDemo";
import PlayButtonIcon from "../assets/icons/play-button-icon.svg";
import ConnectionIcon from "../assets/icons/connection-icon.svg";
import AssistantIcon from "../assets/icons/ai-assistant-icon.svg";
import InfoIcon from "../assets/icons/information-icon.svg";

export default function LiveDemo() {
    return (
        <StyleLiveDemo>
            <div className="demo-container">
                <div className="demo-content">
                    <div className="demo-header">
                        <h2 className="demo-title">Live Demo</h2>
                        <p className="demo-description">
                            Experience the integration in action with interactive pixel art animations
                        </p>
                    </div>

                    <div className="demo-card">
                        <div className="demo-window">
                            <div className="window-overlay"></div>
                            <div className="window-controls">
                                <div className="control-dot green"></div>
                                <div className="control-dot yellow"></div>
                                <div className="control-dot blue"></div>
                            </div>

                            <div className="demo-preview">
                                <div className="play-button">
                                    <div className="play-icon">
                                        <img src={PlayButtonIcon} alt="Play Button" width={22.5} height={30}/>
                                    </div>
                                </div>

                                <h3 className="preview-title">Interactive Factory Simulation</h3>
                                <p className="preview-description">
                                    Watch pixel art animations come to life as data flows between Factory IO, TIA Portal, and React in real-time
                                </p>

                                <button className="launch-button">Launch Demo</button>
                            </div>
                        </div>

                        <div className="feature-cards">
                            <div className="feature-card">
                                <div className="feature-icon control">
                                    <img src={ConnectionIcon} alt="Control Signals Icon" />
                                </div>
                                <h4 className="feature-title">Control Signals</h4>
                                <p className="feature-description">Real-time system control interface</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon assistant">
                                    <img src={AssistantIcon} alt="AI Assistant Icon" />
                                </div>
                                <h4 className="feature-title">AI Assistant</h4>
                                <p className="feature-description">Interactive chat for troubleshooting</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon info">
                                    <img src={InfoIcon} alt="Information Icon" />
                                </div>
                                <h4 className="feature-title">Information</h4>
                                <p className="feature-description">Project insights and documentation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyleLiveDemo>
    );
}
