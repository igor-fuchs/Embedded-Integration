import { StyleLanguageSelector } from "./styles/LanguageSelector"
import WebInterfaceIcon from "../assets/icons/web-interface-icon.svg?react";
import ArrowIcon from "../assets/icons/arrow-icon-header.svg?react";

export default function LanguageSelector() {
    return (
        <StyleLanguageSelector id="LanguageSelector">
            <WebInterfaceIcon className="web-icon" id="WebIcon"/>
            <p className="language-selector-text" id="LanguageSelectorText">English</p>
            <ArrowIcon className="arrow-icon" id="ArrowIcon" />
        </StyleLanguageSelector>
    );
}