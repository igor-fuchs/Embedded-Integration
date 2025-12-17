const useScrollToSection = (sectionId: string, externalFunction?: () => void) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Get header height to offset scroll position
            const headerEl = document.querySelector('.header-nav') as HTMLElement;
            const headerHeight = headerEl.offsetHeight;

            // Get element top position relative to the document
            const elementTop = element.getBoundingClientRect().top + window.pageYOffset;

            // Calculate target position considering header height
            const target = Math.max(elementTop - headerHeight, 0);

            window.scrollTo({ top: target, behavior: 'smooth' });
        }
        externalFunction && externalFunction();
    };

export default useScrollToSection;