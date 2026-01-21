import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import brFlag from "@assets/translates/icons/br-flag.svg";
import usFlag from "@assets/translates/icons/us-flag.svg";
import enTranslation from "@assets/translates/enTranslation.json";
import ptTranslation from "@assets/translates/ptTranslation.json";

type Language = {
    code: string;
    label: string;
    flag: string;
};

// Languages available in the app
export const languagesAvailable: Language[] = [
    { code: "en", label: "English", flag: usFlag },
    { code: "pt", label: "Português (Brasil)", flag: brFlag }
];

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { common: enTranslation },
            pt: { common: ptTranslation },
        },
        fallbackLng: "en",
        supportedLngs: ["en", "pt"],
        debug: false,
        ns: ["common"],
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
