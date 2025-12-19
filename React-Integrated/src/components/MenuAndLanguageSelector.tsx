import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import i18n, { languagesAvailable } from "../util/translation";
import { StyleMenuAndLanguageSelector } from "./styles/MenuAndLanguageSelector";
import useOnClickOutside from "../hooks/useOnClickOutside";
import WebInterfaceIcon from "../assets/icons/web-interface-icon.svg?react";
import ArrowIcon from "../assets/icons/arrow-icon-header.svg?react";
import PreviousIcon from "../assets/icons/previous-icon.png";

export interface MenuItem {
    label: string;
    onClick: () => void;
}

interface MenuAndLanguageSelectorProps {
    menuItems?: MenuItem[];
    isMobile?: boolean;
}

export default function MenuAndLanguageSelector({
    menuItems = [],
    isMobile = false,
}: MenuAndLanguageSelectorProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [showLanguages, setShowLanguages] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get current language (or english) and available languages
    const currentLanguage = languagesAvailable.find(lang => lang.code === i18n.language) || languagesAvailable[0];
    const availableLanguages = languagesAvailable.filter(lang => lang.code !== i18n.language);

    // Handle language change
    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
        setShowLanguages(false);
    };

    // Handle dropdown toggle
    const handleToggleDropdown = () => {
        if (!isMobile) {
            setIsOpen(!isOpen);
        }
    };

    // Handle language selector click
    const handleLanguageSelectorClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowLanguages(true);
    };

    // Handle back click in language selector (mobile)
    const handleBackClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowLanguages(false);
    };

    // Close dropdown when clicking outside (desktop)
    useOnClickOutside(
        dropdownRef,
        () => setIsOpen(false)
    );

    // #region Mobile
    if (isMobile) {

        // Show menu items + language selector button
        if (!showLanguages) {
            return (
                <StyleMenuAndLanguageSelector>
                    {menuItems.map((item, index) => (
                        <div key={index} className="mobile-nav-link" onClick={item.onClick}>
                            <div className="mobile-nav-text">{item.label}</div>
                        </div>
                    ))}
                    <div className="mobile-nav-link" onClick={handleLanguageSelectorClick}>
                        <div id="LanguageSelector" className="language-selector">
                            <div className="language-selector-header">
                                <WebInterfaceIcon className="web-icon" id="WebIcon" />
                                <p className="language-selector-text" id="LanguageSelectorText">{currentLanguage.label}</p>
                                <ArrowIcon className="arrow-icon" id="ArrowIcon" />
                            </div>
                        </div>
                    </div>
                </StyleMenuAndLanguageSelector>
            );
        }

        // Show languages available to selection
        if (showLanguages) {
            return (
                <StyleMenuAndLanguageSelector>
                    <div className="mobile-nav-link" onClick={handleBackClick}>
                        <div className="mobile-nav-text back-button">
                            <img src={PreviousIcon} alt="Previous" className="previous-icon" />
                            {t("Back")}
                        </div>
                    </div>
                    {languagesAvailable.map((lang) => (
                        <div
                            key={lang.code}
                            className="mobile-nav-link"
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <img src={lang.flag} alt={lang.label} style={{ width: '24px', height: '16px' }} />
                            <div className="mobile-nav-text">{lang.label}</div>
                        </div>
                    ))}
                </StyleMenuAndLanguageSelector>
            );
        }
    }

    // #endregion

    // #region Desktop
    return (
        <StyleMenuAndLanguageSelector className="nav-links">
            {/* Menu Items */}
            {menuItems.map((item, index) => (
                <div key={index} className="nav-link">
                    <div className="nav-text" onClick={item.onClick}>{item.label}</div>
                </div>
            ))}
            {/* Language Selector */}
            <div ref={dropdownRef} id="LanguageSelector" className="language-selector">
                {/* Header */}
                <div onClick={handleToggleDropdown} className="language-selector-header">
                    <WebInterfaceIcon className="web-icon" id="WebIcon" />
                    <p className="language-selector-text" id="LanguageSelectorText">{currentLanguage.label}</p>
                    <ArrowIcon className={isOpen ? "arrow-icon open" : "arrow-icon"} id="ArrowIcon" />
                </div>
                {/* Dropdown Menu - Only Languages */}
                {isOpen && (
                    <div className="dropdown-menu">
                        {availableLanguages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                id={`DropdownItem ${lang.code}`}
                                className="dropdown-item"
                            >
                                <img src={lang.flag} alt={lang.label} />
                                {lang.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StyleMenuAndLanguageSelector>
    );
    // #endregion
}
