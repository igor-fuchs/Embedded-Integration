import { useEffect, type RefObject } from 'react';

export const useYMonitor = (
    ref: RefObject<HTMLElement | null>,
    isActive: boolean,
    setValueOfMovement: React.Dispatch<React.SetStateAction<number>>,
    valueOfMovement: number
) => {
    useEffect(() => {
        if (!ref.current || !isActive) return;
        
        let animationId: number;
        let lastYPosition = ref.current.getBoundingClientRect().y;
        const refHeight = ref.current.getBoundingClientRect().height;
        let isRunning = true; // Flag para controlar se deve continuar
        
        const yMonitor = () => {
            if (!ref.current || !isRunning) return; // Verifica a flag
            
            const currentYPosition = ref.current.getBoundingClientRect().y;
            
            if (currentYPosition !== lastYPosition) {
                const checkingMovement = lastYPosition - currentYPosition;
                
                setValueOfMovement(prev => {
                    if (checkingMovement > 0) {
                        return prev - checkingMovement;
                    } else {
                        return prev - (checkingMovement + refHeight / 2);
                    }
                });
                
                lastYPosition = currentYPosition;
            }
            
            if (isRunning) { // Só agenda novo frame se ainda estiver rodando
                animationId = requestAnimationFrame(yMonitor);
            }
        };
        
        animationId = requestAnimationFrame(yMonitor);
        
        return () => {
            isRunning = false; // Para imediatamente
            cancelAnimationFrame(animationId);
        };
    }, [isActive, ref, setValueOfMovement]);
};