import { useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleHeader } from "./styles/Header";
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

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Get header height to offset scroll position
            const headerEl = document.querySelector('.header-nav') as HTMLElement;
            const headerHeight = headerEl.offsetHeight;

            // Get element top position relative to the document
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

            // Calculate target position considering header height
            const target = Math.max(elementTop - headerHeight, 0);

            window.scrollTo({ top: target, behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    // Menu items configuration
    const navMenuItems = useMemo<MenuItem[]>(() => [
        { label: t("About"), onClick: () => scrollToSection('About') },
        { label: t("Technologies"), onClick: () => scrollToSection('Technologies') },
        { label: t("Demo"), onClick: () => scrollToSection('Demo') },
        { label: t("Contact"), onClick: () => scrollToSection('Contact') }
    ], [t]);



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
                        <img src={MenuBarIcon} alt="Menu" style={{filter: "invert(1)"}} className="menu-bar-icon" />
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
