

import { useState, useRef } from "react";
import i18n, { languagesAvailable as languages } from "../util/translation";
import { StyleLanguageSelector, StyleDropdownMenu, StyleDropDownItem } from "./styles/MenuAndLanguageSelector"
import useOnClickOutside from "../hooks/useOnClickOutside";
import WebInterfaceIcon from "../assets/icons/web-interface-icon.svg?react";
import ArrowIcon from "../assets/icons/arrow-icon-header.svg?react";

interface LanguageSelectorProps {
    isMobile?: boolean;
    isOpen?: boolean;
}

export default function LanguageSelector({ isMobile = false, isOpen: externalIsOpen }: LanguageSelectorProps = {}) {
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
        if (!isMobile) {
            setIsOpen(!isOpen);
        }
    }

    useOnClickOutside(
        dropdownRef,
        () => setIsOpen(false)
    );

    return (
        <StyleLanguageSelector ref={dropdownRef} id="LanguageSelector" className="language-selector">
            {/* Header */}
            <div onClick={handleToggleDropdown} className="language-selector-header">
                <WebInterfaceIcon className="web-icon" id="WebIcon" />
                <p className="language-selector-text" id="LanguageSelectorText">{currentLanguage.label}</p>
                <ArrowIcon className={isOpen ? "arrow-icon open" : "arrow-icon"} id="ArrowIcon" />
            </div>
            {/* Dropdown Menu */}
            {!isMobile && isOpen && (
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