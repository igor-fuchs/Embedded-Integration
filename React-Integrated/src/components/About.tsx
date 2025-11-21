import { StyleAbout } from "./styles/About";
import IndustrialIcon from "../assets/icons/industrial-icon.svg";
import WebInterfaceIcon from "../assets/icons/web-interface-icon.svg";
import logo from '../assets/logo.svg';
import StatusIndicator from "./StatusIndicator";

export default function About() {
    return (
        <StyleAbout id="About">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-header">
                        <h2 className="about-title">About the Project</h2>
                        <p className="about-description">
                            Demonstrating seamless data flow between industrial automation systems and modern web interfaces
                        </p>
                    </div>

                    <div className="about-grid">
                        <div className="features-column">
                            <div className="feature-card">
                                <div className="feature-content">
                                    <div className="feature-icon industrial">
                                        <img src={IndustrialIcon} alt="Industrial Icon" />
                                    </div>
                                    <div className="feature-text">
                                        <h3 className="feature-title">Industrial Integration</h3>
                                        <p className="feature-description">
                                            Factory IO simulates real industrial processes, while TIA Portal provides PLC programming capabilities, creating an authentic automation environment.
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
                                        <h3 className="feature-title">Web Interface</h3>
                                        <p className="feature-description">
                                            React-based dashboard provides real-time monitoring and control capabilities, bridging the gap between industrial systems and modern web technologies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="diagram-column">
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
                                            <span className="status-text">Simulation</span>
                                        </div>
                                        <div className="status-item">
                                            <StatusIndicator id="Processing" status={true} colorOn="#facc15" colorOff="#f70000" />
                                            <span className="status-text">Processing</span>
                                        </div>
                                        <div className="status-item">
                                            <StatusIndicator id="Interface" status={true} colorOn="#60a5fa" colorOff="#f70000" />
                                            <span className="status-text">Interface</span>
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
