import { StyleTechnologies } from "./styles/Technologies";
import { listCards } from "./lib/TechnologiesLib";
import { useRef, useState, useEffect } from "react";

export default function Technologies() {
    // Bug
    // Se eu segurar o drag por muito tempo e soltar, o auto scroll reinicia e para logo em seguida.

    // Okay code
    const cards = listCards;
    const inactivityTimer = useRef<number | null>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    // Checking
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [lastTime, setLastTime] = useState(0);
    const contentWidthRef = useRef<number>(0);

    // Okay code
    const resetInactivityTimer = () => {
        if (inactivityTimer.current) {
            clearTimeout(inactivityTimer.current);
        }
        setAutoScroll(false);
        inactivityTimer.current = window.setTimeout(() => {
            setAutoScroll(true);
        }, 3000);
    };


    // Checking

    useEffect(() => {
        if (scrollRef.current) {
            contentWidthRef.current = scrollRef.current.scrollWidth / 2;
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return; // Avoid errors if the element is not ready
        resetInactivityTimer();
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        setLastX(e.pageX);
        setLastTime(Date.now());
        setVelocity(0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault(); // Avoid unwanted selections

        // Calculate the new scroll position based on mouse movement
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollRef.current.scrollLeft = scrollLeft - walk;

        // Calculate velocity for momentum using time difference between drag events
        const currentTime = Date.now();
        const timeDiff = currentTime - lastTime;
        if (timeDiff > 0) {
            const newVelocity = (e.pageX - lastX) / timeDiff;
            setVelocity(newVelocity);
        }
        setLastX(e.pageX);
        setLastTime(currentTime);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
        }
    };

    // // Touch handlers for mobile
    // const handleTouchStart = (e: React.TouchEvent) => {
    //     if (!scrollRef.current) return;
    //     resetInactivityTimer();
    //     setIsDragging(true);
    //     const touch = e.touches[0];
    //     setStartX(touch.pageX - scrollRef.current.offsetLeft);
    //     setScrollLeft(scrollRef.current.scrollLeft);
    //     setLastX(touch.pageX);
    //     setLastTime(Date.now());
    //     setVelocity(0);
    // };

    // const handleTouchMove = (e: React.TouchEvent) => {
    //     if (!isDragging || !scrollRef.current) return;
    //     const touch = e.touches[0];
    //     const x = touch.pageX - scrollRef.current.offsetLeft;
    //     const walk = (x - startX) * 1.5;
    //     scrollRef.current.scrollLeft = scrollLeft - walk;

    //     const currentTime = Date.now();
    //     const timeDiff = currentTime - lastTime;
    //     if (timeDiff > 0) {
    //         const newVelocity = (touch.pageX - lastX) / timeDiff;
    //         setVelocity(newVelocity);
    //     }
    //     setLastX(touch.pageX);
    //     setLastTime(currentTime);

    //     // Wrap-around during drag
    //     const contentWidth = contentWidthRef.current;
    //     if (contentWidth > 0) {
    //         if (scrollRef.current.scrollLeft >= contentWidth) {
    //             scrollRef.current.scrollLeft -= contentWidth;
    //         } else if (scrollRef.current.scrollLeft <= 0) {
    //             scrollRef.current.scrollLeft += contentWidth;
    //         }
    //     }
    // };

    // const handleTouchEnd = () => {
    //     setIsDragging(false);
    //     resetInactivityTimer();
    // };

    // Initial measurement of content width (original set of cards)


    // Momentum after drag release
    useEffect(() => {
        if (!isDragging && Math.abs(velocity) > 0.1 && scrollRef.current) {
            let currentVelocity = velocity * 16; // scale
            const decay = 0.95;
            const step = () => {
                if (!scrollRef.current) return;
                if (Math.abs(currentVelocity) < 0.5) return;
                scrollRef.current.scrollLeft -= currentVelocity;
                currentVelocity *= decay;

                // Wrap-around
                const contentWidth = contentWidthRef.current;
                if (contentWidth > 0) {
                    if (scrollRef.current.scrollLeft >= contentWidth) {
                        scrollRef.current.scrollLeft -= contentWidth;
                    } else if (scrollRef.current.scrollLeft <= 0) {
                        scrollRef.current.scrollLeft += contentWidth;
                    }
                }
                requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }
    }, [isDragging, velocity]);

    // Auto-scroll when inactive
    useEffect(() => {
        if (!autoScroll || isDragging) return;
        let rafId: number;
        const speed = 0.8; // velocidade um pouco maior para ficar visível
        const autoStep = () => {
            if (!scrollRef.current) return;
            scrollRef.current.scrollLeft += speed;
            const contentWidth = contentWidthRef.current;
            // console.log("CONTENT WIDTH:", contentWidth);
            // console.log("SCROLL LEFT:", scrollRef.current.scrollLeft);
            if (contentWidth > 0) {
                if (scrollRef.current.scrollLeft >= contentWidth) {
                    scrollRef.current.scrollLeft -= contentWidth;
                } else if (scrollRef.current.scrollLeft <= 0) {
                    // console.log("HERE");
                    scrollRef.current.scrollLeft += (contentWidth - 100);
                }
            }
            rafId = requestAnimationFrame(autoStep);
        };
        rafId = requestAnimationFrame(autoStep);
        return () => cancelAnimationFrame(rafId);
    }, [autoScroll, isDragging]);

    return (
        <StyleTechnologies id="Technologies">
            <div className="technologies-container">
                <div className="technologies-content">
                    <div className="technologies-header">
                        <h2 className="technologies-title">Technologies</h2>
                        <p className="technologies-description">
                            Cutting-edge tools and platforms powering the integration
                        </p>
                    </div>

                    <div className="technologies-grid">
                        <div
                            className="technologies-scroll"
                            ref={scrollRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        // onTouchStart={handleTouchStart}
                        // onTouchMove={handleTouchMove}
                        // onTouchEnd={handleTouchEnd}
                        >
                            <div className="technologies-track">
                                {cards.concat(cards).map((c, idx) => (
                                    <div key={c.key + '-' + idx} className="tech-card">
                                        <div className={`tech-icon ${c.iconClass}`}>
                                            <img src={c.icon} alt={c.title} {...(c.key === 'tia-portal' ? { width: 22, height: 22 } : {})} />
                                        </div>
                                        <h3 className="tech-title">{c.title}</h3>
                                        <p className="tech-description">{c.description}</p>
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
