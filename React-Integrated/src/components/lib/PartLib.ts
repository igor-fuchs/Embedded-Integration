// Check if the part is touching the object
export const isTouching = (partRef: React.RefObject<HTMLDivElement | null>, objectRef: React.RefObject<HTMLDivElement | null>): boolean => {
    if (!partRef.current || !objectRef.current) return false;

    const partRect = partRef.current.getBoundingClientRect();
    const objectElement = objectRef.current.parentElement;
    if (!objectElement) return false;

    const objectRect = objectElement.getBoundingClientRect();

    // Verifica sobreposição horizontal e vertical
    const horizontalOverlap =
        partRect.left < objectRect.right &&
        partRect.right > objectRect.left;

    const verticalOverlap =
        partRect.top < objectRect.bottom &&
        partRect.bottom > objectRect.top;

    return horizontalOverlap && verticalOverlap;
};
