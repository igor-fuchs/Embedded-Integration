import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleHeader } from "./styles/Header";
import useScrollToSection from "../hooks/useScrollToSection";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Logo from "../assets/logo.svg";
import MenuBarIcon from "../assets/icons/menu-bar-icon.svg";
import MenuAndLanguageSelector, { type MenuItem } from "./MenuAndLanguageSelector";

export default function Header() {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    // Close the menu when clicking/tapping outside
    useOnClickOutside(mobileMenuRef, () => {
        setIsMobileMenuOpen(false);
    });

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Menu items configuration
    const navMenuItems: MenuItem[] = [
        { label: t("About"), onClick: () => useScrollToSection('About', toggleMobileMenu) },
        { label: t("Technologies"), onClick: () => useScrollToSection('Technologies', toggleMobileMenu) },
        { label: t("Demo"), onClick: () => useScrollToSection('Demo', toggleMobileMenu) },
        { label: t("Contact"), onClick: () => useScrollToSection('Contact', toggleMobileMenu) }
    ];



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

                    {/* Version Mobile */}
                    <div className="mobile-menu-icon" ref={mobileMenuRef} onClick={toggleMobileMenu} >
                        <img src={MenuBarIcon} alt="Menu" style={{ filter: "invert(1)" }} className="menu-bar-icon" />
                        {isMobileMenuOpen && (
                            <div className="mobile-menu">
                                <MenuAndLanguageSelector
                                    menuItems={navMenuItems}
                                    isMobile={true}
                                />
                            </div>
                        )}
                    </div>

                    {/* Version Desktop */}
                    <MenuAndLanguageSelector
                        menuItems={navMenuItems}
                        isMobile={false}
                    />

                </div>
            </nav>
        </StyleHeader>
    )
}
