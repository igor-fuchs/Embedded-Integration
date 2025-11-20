import { useState, useRef } from "react";
import { StyleHeader } from "./styles/Header";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Logo from "../assets/logo.svg";
import MenuBarIcon from "../assets/icons/menu-bar-icon.svg";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const menuIconRef = useRef<HTMLDivElement | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close the menu when clicking/tapping outside (but not on menu icon)
    useOnClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false), [menuIconRef]);

    return (
        <StyleHeader>
            <nav className="header-nav" >
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
                    {/* Nav links - Version Desktop */}
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
                        <div className="nav-link">
                            <LanguageSelector />
                        </div>
                    </div>
                    {/* Nav links - Version Mobile */}
                    <div className="mobile-menu-icon" onClick={toggleMobileMenu} ref={menuIconRef}>
                        <img src={MenuBarIcon} alt="Menu" />
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="mobile-menu" ref={mobileMenuRef}>
                        <div className="mobile-nav-link" onClick={toggleMobileMenu}>
                            <div className="mobile-nav-text">About</div>
                        </div>
                        <div className="mobile-nav-link" onClick={toggleMobileMenu}>
                            <div className="mobile-nav-text">Technologies</div>
                        </div>
                        <div className="mobile-nav-link" onClick={toggleMobileMenu}>
                            <div className="mobile-nav-text">Demo</div>
                        </div>
                        <div className="mobile-nav-link" onClick={toggleMobileMenu}>
                            <div className="mobile-nav-text">Contact</div>
                        </div>
                    </div>
                )}
            </nav>
        </StyleHeader>
    )
}
