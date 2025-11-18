import { StyleGetStarted } from "./styles/GetStarted";
import GithubIcon from "../assets/icons/github-icon.svg";
import ContactIcon from "../assets/icons/contact-icon.svg";
import LinkedinIcon from "../assets/icons/linkedin-icon.svg?react";

export default function GetStarted() {
    return (
        <StyleGetStarted>
            <div className="get-started-container">
                <div className="get-started-content">
                    <h2 className="section-title">Get Started</h2>
                    <p className="section-subtitle">
                        Explore the code, contribute to the project, or connect with the development team
                    </p>

                    <div className="action-buttons">
                        <button className="btn-repository">
                            <img src={GithubIcon} alt="GitHub Repository" />
                            View Repository
                        </button>

                        <button className="btn-contact">
                            <img src={ContactIcon} alt="Contact Icon" />
                            Contact Us
                        </button>
                    </div>

                    <div className="collaboration-card">
                        <h3 className="card-title">Connect & Collaborate</h3>
                        <p className="card-description">
                            Join the community of developers and engineers exploring the intersection of
                            industrial automation and modern web technologies.
                        </p>

                        <div className="social-icons">
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <LinkedinIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </StyleGetStarted>
    );
}
