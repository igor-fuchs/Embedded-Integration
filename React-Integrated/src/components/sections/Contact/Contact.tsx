import { StyleContact } from "@styles/Contact";
import GithubIcon from "@assets/icons/github-icon.svg";
import ContactIcon from "@assets/icons/contact-icon.svg";
import LinkedinIcon from "@assets/icons/linkedin-icon.svg?react";
import { useTranslation } from "react-i18next";

export const LINKS = {
    GITHUB: "https://github.com/igor-fuchs",
    LINKEDIN: "https://www.linkedin.com/in/igor-fuchs-pereira/",
    EMAIL: "https://mail.google.com/mail/?view=cm&to=igorfuchs111@gmail.com",
};

export default function Contact() {
    const { t } = useTranslation();

    return (
        <StyleContact data-testid="contact-section" id="Contact">
            <div className="contact-container">
                <div className="contact-content">
                    <h2 className="section-title">{t('Contact')}</h2>
                    <p className="section-subtitle">
                        {t('ContactSubtitle')}
                    </p>

                    <div className="action-buttons">
                        <button data-testid="btn-repository" className="btn-repository" onClick={() => window.open(LINKS.GITHUB, "_blank")}>
                            <img src={GithubIcon} alt="GitHub" />
                            {t('ViewRepository')}
                        </button>

                        <button data-testid="btn-contact" className="btn-contact" onClick={() => window.open(LINKS.EMAIL, "_blank")} >
                            <img src={ContactIcon} alt="Contact" />
                            {t('ContactMe')}
                        </button>
                    </div>

                    <div className="collaboration-card">
                        <h3 className="card-title">{t('ConnectCollaborate')}</h3>
                        <p className="card-description">
                            {t('ConnectCollaborateDescription')}
                        </p>

                        <div className="social-icons">
                            <button data-testid="btn-linkedin" className="btn-linkedin" aria-label={t("Open LinkedIn")} onClick={() => window.open(LINKS.LINKEDIN, "_blank")}>
                                <LinkedinIcon title="LinkedIn Icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </StyleContact>
    );
}
