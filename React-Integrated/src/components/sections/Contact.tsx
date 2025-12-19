import { StyleContact } from "../.styles/Contact";
import GithubIcon from "../../assets/icons/github-icon.svg";
import ContactIcon from "../../assets/icons/contact-icon.svg";
import LinkedinIcon from "../../assets/icons/linkedin-icon.svg?react";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t } = useTranslation();
    return (
        <StyleContact id="Contact">
            <div className="contact-container">
                <div className="contact-content">
                    <h2 className="section-title">{t('Contact')}</h2>
                    <p className="section-subtitle">
                        {t('ContactSubtitle')}
                    </p>

                    <div className="action-buttons">
                        <button data-testid="btn-repository" className="btn-repository" onClick={() => window.open("https://github.com/igor-fuchs", "_blank")}>
                            <img src={GithubIcon} alt="GitHub Repository" />
                            {t('ViewRepository')}
                        </button>

                        <button data-testid="btn-contact" className="btn-contact">
                            <img src={ContactIcon} alt="Contact Icon" />
                            {t('ContactMe')}
                        </button>
                    </div>

                    <div className="collaboration-card">
                        <h3 className="card-title">{t('ConnectCollaborate')}</h3>
                        <p className="card-description">
                            {t('ConnectCollaborateDescription')}
                        </p>

                        <div className="social-icons">
                            <a href="https://www.linkedin.com/in/igor-fuchs-pereira/" className="social-link" aria-label="LinkedIn" target="_blank">
                                <LinkedinIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </StyleContact>
    );
}
