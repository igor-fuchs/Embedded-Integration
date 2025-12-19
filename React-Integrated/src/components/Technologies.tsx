import { StyleTechnologies } from "./styles/Technologies";
import { listCards } from "./lib/TechnologiesLib";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Technologies() {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const cards = listCards.concat(listCards);

    useEffect(() => {
        if (!scrollRef.current) return; 

        // Auto-scroll speed and animation frame ID
        let rafId: number;
        const speed = 0.7;

        // Animation loop for auto-scrolling
        const autoStep = () => {
            if (!scrollRef.current) return;
            scrollRef.current.scrollLeft += speed;
            const contentWidth = scrollRef.current.scrollWidth / 2;
            if (scrollRef.current.scrollLeft >= contentWidth) {
                scrollRef.current.scrollLeft -= contentWidth;
            }
            rafId = requestAnimationFrame(autoStep);
        };
        rafId = requestAnimationFrame(autoStep);

        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <StyleTechnologies id="Technologies">
            <div className="technologies-container">
                <div className="technologies-content">
                    <div className="technologies-header">
                        <h2 className="technologies-title">{t('Technologies')}</h2>
                        <p className="technologies-description">
                            {t('TechnologiesDescription')}
                        </p>
                    </div>

                    <div className="technologies-grid">
                        <div
                            className="technologies-scroll"
                            ref={scrollRef}
                        >
                            <div className="technologies-track">
                                {cards.map((card, idx) => (
                                    <div
                                        key={card.key + '-' + idx}
                                        className="tech-card"
                                    >
                                        <div className={`tech-icon ${card.iconClass}`}>
                                            <img src={card.icon} alt={card.title} />
                                        </div>
                                        <h3 className="tech-title">{t(card.key + '_title')}</h3>
                                        <p className="tech-description">{t(card.key + '_description')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyleTechnologies>
    );
}
