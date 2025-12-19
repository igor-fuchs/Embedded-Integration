// Check if the part is touching the object
export const isTouching = (
    partRef: React.RefObject<HTMLDivElement | null>,
    objectRef: React.RefObject<HTMLDivElement | null>
): boolean => {
    if (!partRef.current || !objectRef.current) return false;

    const partRect = partRef.current.getBoundingClientRect();
    const objectRect = objectRef.current.getBoundingClientRect();

    // Check for overlap
    const horizontalOverlap =
        partRect.left < objectRect.right && partRect.right > objectRect.left;

    const verticalOverlap =
        partRect.top < objectRect.bottom && partRect.bottom > objectRect.top;

    return horizontalOverlap && verticalOverlap;
};

type FollowConveyorAnimationParams = {
    conveyorRef: React.RefObject<HTMLDivElement | null>;
    frameTime: React.RefObject<number>;
    animationID: React.RefObject<number | null>;
    running: boolean;
    touching: boolean;
    scaleFactor: number;
    setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

// Arrow function to handle conveyor animation
export const followConveyorAnimation = ({
    conveyorRef,
    frameTime,
    animationID,
    running,
    touching,
    scaleFactor,
    setOffset,
}: FollowConveyorAnimationParams) => {
    if (!running || !touching) {
        cancelAnimationFrame(animationID.current!);
        animationID.current = null;
        return;
    }

    const animate = (currentTime: number) => {
        // Intializing the animation start time
        if (!frameTime.current) {
            frameTime.current = currentTime;
        }

        // Calculating time difference
        const deltaTime = currentTime - frameTime.current;

        if (deltaTime > 0) {
            const speed = parseFloat(
                conveyorRef.current?.dataset.speedMs || "0"
            );

            // Moving animation based on speed and time elapsed
            setOffset((prev) => ({
                ...prev,
                y: prev.y - (speed * deltaTime) / scaleFactor,
            }));

            // Changing the firstTime to the current time after frame update
            frameTime.current = currentTime;
        }

        animationID.current = requestAnimationFrame(animate);
    };

    frameTime.current = 0;
    animationID.current = requestAnimationFrame(animate);

    return () => {
        if (animationID.current) {
            cancelAnimationFrame(animationID.current);
            animationID.current = null;
        }
    };
};
