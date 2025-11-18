import { StyleFooter } from "./styles/Footer";
import logo from "../assets/logo.svg";

export default function Footer() {
    return (
        <StyleFooter>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="brand-section">
                        <img src={logo} alt="Embedded Integration Logo" />
                        <span className="brand-name">
                            <span style={{ color: "white" }}>
                                Embedded
                            </span>
                            {" Integration"}
                        </span>
                    </div>

                    <div className="footer-info">
                        <span className="copyright-text">© 2024 Embedded Integration Project</span>
                        <span className="separator">•</span>
                        <span className="industry-text">Industry 4.0 Innovation</span>
                    </div>
                </div>
            </div>
        </StyleFooter>
    );
}
