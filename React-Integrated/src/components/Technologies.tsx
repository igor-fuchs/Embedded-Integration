import { StyleTechnologies } from "./styles/Technologies";
import IndustrialIcon from '../assets/icons/industrial-icon.svg';
import Logo from '../assets/logo.svg';
import ReactIcon from '../assets/icons/react-icon.svg';
import DotNetIcon from '../assets/icons/dotnet-icon.png';
import ConfigIcon from '../assets/icons/config-icon.svg';
import PaintIcon from '../assets/icons/paint-icon.svg';

export default function Technologies() {
    return (
        <StyleTechnologies>
            <div className="technologies-container">
                <div className="technologies-content">
                    <div className="technologies-header">
                        <h2 className="technologies-title">Technologies</h2>
                        <p className="technologies-description">
                            Cutting-edge tools and platforms powering the integration
                        </p>
                    </div>

                    <div className="technologies-grid">
                        <div className="tech-card">
                            <div className="tech-icon factory-io">
                                <img src={IndustrialIcon} alt="Factory IO" />
                            </div>
                            <h3 className="tech-title">Factory IO</h3>
                            <p className="tech-description">
                                3D factory simulation platform providing realistic industrial automation scenarios and equipment modeling.
                            </p>
                        </div>

                        <div className="tech-card">
                            <div className="tech-icon tia-portal">
                                <img src={Logo} alt="TIA Portal" width="22" height="22" />
                            </div>
                            <h3 className="tech-title">TIA Portal</h3>
                            <p className="tech-description">
                                Siemens engineering framework for PLC programming, HMI development, and industrial automation control.
                            </p>
                        </div>

                        <div className="tech-card">
                            <div className="tech-icon react">
                                <img src={ReactIcon} alt="React" />
                            </div>
                            <h3 className="tech-title">React</h3>
                            <p className="tech-description">
                                Modern JavaScript library for building responsive user interfaces and real-time data visualization dashboards.
                            </p>
                        </div>

                        <div className="tech-card">
                            <div className="tech-icon dotnet">
                                <img src={DotNetIcon} alt=".NET" className="dotnet"/>
                            </div>
                            <h3 className="tech-title">.NET</h3>
                            <p className="tech-description">
                                Server-side runtime enabling real-time communication and data processing between systems.
                            </p>
                        </div>

                        <div className="tech-card">
                            <div className="tech-icon siemens-plc">
                                <img src={ConfigIcon} alt="Communication Protocols" />
                            </div>
                            <h3 className="tech-title">Communication Protocols</h3>
                            <p className="tech-description">
                                OPC UA and HTTP enabling communication between industrial devices and services.
                            </p>
                        </div>

                        <div className="tech-card">
                            <div className="tech-icon pixel-art">
                                <img src={PaintIcon} alt="Pixel Art" />
                            </div>
                            <h3 className="tech-title">Pixel Art</h3>
                            <p className="tech-description">
                                Custom animated pixel art visualizations bringing factory operations to life in a unique artistic style.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StyleTechnologies>
    );
}
