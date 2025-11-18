import { StyleHeader } from "./styles/Header";
import Logo from '../assets/logo.svg';

export default function Header() {
    return (
        <StyleHeader>
            <nav className="header-nav">
                <div className="header-content">
                    <div className="brand-container">
                        <img className="brand-logo" alt="Logo" src={Logo} />
                        <div className="brand-title">
                            <span style={{ color: "white" }}>
                                Embedded
                            </span>
                            {" Integration"}
                        </div>
                    </div>
                    <div className="nav-links">
                        <div className="nav-link">
                            <div className="nav-text">About</div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-text">Technologies</div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-text">Demo</div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-text">Contact</div>
                        </div>
                    </div>
                </div>
            </nav>
        </StyleHeader>
    )
}
