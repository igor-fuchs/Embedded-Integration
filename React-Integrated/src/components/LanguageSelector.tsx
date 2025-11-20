

import { useState, useRef } from "react";
import i18n, { languagesAvailable as languages } from "../util/translation";
import { StyleLanguageSelector, StyleDropdownMenu, StyleDropDownItem } from "./styles/LanguageSelector"
import useOnClickOutside from "../hooks/useOnClickOutside";
import WebInterfaceIcon from "../assets/icons/web-interface-icon.svg?react";
import ArrowIcon from "../assets/icons/arrow-icon-header.svg?react";

export default function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get current language(or english) and available languages
    const currentLanguage = languages.filter(lang => lang.code === i18n.language)[0] || languages[0];
    const availableLanguages = languages.filter(lang => lang.code !== i18n.language);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    }

    useOnClickOutside(
        dropdownRef,
        () => setIsOpen(false)
    );

    return (
        <StyleLanguageSelector ref={dropdownRef} id="LanguageSelector">
            {/* Header */}
            <div onClick={handleToggleDropdown} className="language-selector-header">
                <WebInterfaceIcon className="web-icon" id="WebIcon" />
                <p className="language-selector-text" id="LanguageSelectorText">{currentLanguage.label}</p>
                <ArrowIcon className={isOpen ? "arrow-icon open" : "arrow-icon"} id="ArrowIcon" />
            </div>
            {/* Dropdown Menu */}
            {isOpen && (
                <StyleDropdownMenu>
                    {availableLanguages.map((lang) => (
                        <StyleDropDownItem
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            id={`DropdownItem ${lang.code}`}
                        >
                            <img src={lang.flag} alt={lang.label} />
                            {lang.label}
                        </StyleDropDownItem>
                    ))}
                </StyleDropdownMenu>
            )}
        </StyleLanguageSelector>
    );
}