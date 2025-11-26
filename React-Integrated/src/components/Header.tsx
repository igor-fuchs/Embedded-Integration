import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { StyleHeader } from "./styles/Header";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Logo from "../assets/logo.svg";
import MenuBarIcon from "../assets/icons/menu-bar-icon.svg";
import LanguageSelector from "./LanguageSelector";
import { languagesAvailable } from "../util/translation";
import i18n from "../util/translation";

export default function Header() {
    // transformar o language selector em um menu que pode ser incluido cabeçalhos(about, technologies, demo, contact)

    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsLanguageSelectorOpen(false);
    };

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsLanguageSelectorOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleLanguageSelectorClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLanguageSelectorOpen(true);
    };

    const handleBackClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLanguageSelectorOpen(false);
    };

    const scrollToSection = (sectionId: string) => {
        toggleMobileMenu();
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
    };

    // Close the menu when clicking/tapping outside (but not on menu icon)
    useOnClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false));

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
                            <div className="nav-text" onClick={() => scrollToSection('About')}>{t("About")}</div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-text" onClick={() => scrollToSection('Technologies')}>{t("Technologies")}</div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-text" onClick={() => scrollToSection('Demo')}>{t("Demo")}</div>
                        </div>
                        <div className="nav-link">
                            <div className="nav-text" onClick={() => scrollToSection('Contact')}>{t("Contact")}</div>
                        </div>
                        <div className="nav-link">
                            <LanguageSelector />
                        </div>
                    </div>

                    {/* Nav links - Version Mobile */}
                    <div className="mobile-menu-icon" onClick={toggleMobileMenu} ref={mobileMenuRef}>
                        <img src={MenuBarIcon} alt="Menu" />
                        {isMobileMenuOpen && (
                            <div className="mobile-menu">
                                {!isLanguageSelectorOpen ? (
                                    // Menu items padrão
                                    <>
                                        <div className="mobile-nav-link" onClick={() => scrollToSection('About')}>
                                            <div className="mobile-nav-text">{t("About")}</div>
                                        </div>
                                        <div className="mobile-nav-link" onClick={() => scrollToSection('Technologies')}>
                                            <div className="mobile-nav-text">{t("Technologies")}</div>
                                        </div>
                                        <div className="mobile-nav-link" onClick={() => scrollToSection('Demo')}>
                                            <div className="mobile-nav-text">{t("Demo")}</div>
                                        </div>
                                        <div className="mobile-nav-link" onClick={() => scrollToSection('Contact')}>
                                            <div className="mobile-nav-text">{t("Contact")}</div>
                                        </div>
                                        <div className="mobile-nav-link" onClick={handleLanguageSelectorClick}>
                                            <LanguageSelector isMobile={true} isOpen={false} />
                                        </div>
                                    </>
                                ) : (
                                    // Lista de linguagens disponíveis
                                    <>
                                        <div className="mobile-nav-link" onClick={handleBackClick}>
                                            <div className="mobile-nav-text">← {t("Back")}</div>
                                        </div>
                                        {languagesAvailable.map((lang) => (
                                            <div
                                                key={lang.code}
                                                className="mobile-nav-link"
                                                onClick={() => handleLanguageChange(lang.code)}
                                            >
                                                <img src={lang.flag} alt={lang.label} style={{ width: '24px', height: '16px', marginRight: '8px' }} />
                                                <div className="mobile-nav-text">{lang.label}</div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </StyleHeader>
    )
}
