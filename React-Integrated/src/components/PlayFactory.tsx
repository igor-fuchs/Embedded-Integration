import { StylePlayFactory } from './styles/PlayFactory';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import PlayButtonIcon from '../assets/icons/play-button-icon.svg';
import FactoryBackground from '../assets/images/factory-background.svg';

import RobotRightBody from "../assets/images/robot-right-body.svg";
import RobotRightAxisX from "../assets/images/robot-right-axis-x.svg";
import RobotRightAxisY from "../assets/images/robot-right-axis-y.svg";
import Conveyor from './Conveyor';
import Robot from './Robot';

// Adicionar um efeito de sombra no arco da esteira para dar profundidade 

const BASE_WIDTH = 1024;
const BASE_HEIGHT = 590;

export function PlayFactory() {
    const { t } = useTranslation();
    const [simulationStart, setSimulationStart] = useState<boolean>(false);
    const [screenHeight, setScreenHeight] = useState<number>(BASE_HEIGHT);
    const screenRef = useRef<HTMLDivElement>(null);

    // Function to calculate the scale coefficient
    const getScaleCoefficient = () => {
        if (!screenRef.current) return 1;
        const widthScale = screenRef.current!.offsetWidth / BASE_WIDTH;
        return Math.min(widthScale);
    };

    // Function to scale values based on the current size
    const scale = (value: number) => value * getScaleCoefficient();

    // Function to get equipment style using scaled dimensions
    const equipamentStyle = (params: {
        width: number;
        height?: number;
        zIndex?: number;
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
    }): React.CSSProperties => ({
        position: 'absolute' as const,
        pointerEvents: 'none',
        userSelect: 'none',
        width: scale(params.width),
        ...(params.height !== undefined && { height: scale(params.height) }),
        ...(params.zIndex !== undefined && { zIndex: params.zIndex }),
        ...(params.top !== undefined && { top: scale(params.top) }),
        ...(params.left !== undefined && { left: scale(params.left) }),
        ...(params.bottom !== undefined && { bottom: scale(params.bottom) }),
        ...(params.right !== undefined && { right: scale(params.right) }),
    })

    const toggleSimulation = () => {
        setSimulationStart(!simulationStart);
    }

    // Refresh dimensions on window resize
    useEffect(() => {
        const updateDimensions = () => {
            const resizingFactor = getScaleCoefficient();
            setScreenHeight(BASE_HEIGHT * resizingFactor);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <StylePlayFactory height={screenHeight} ref={screenRef}>
            {/* Window Controls */}
            <div className="window-controls">
                <div className="control-dot green"></div>
                <div className="control-dot yellow"></div>
                <div className="control-dot blue"></div>
            </div>

            {
                // #region PlayButton
                !simulationStart ? (
                    <>
                        {/* Button and Description */}
                        <div className="demo-preview">
                            <div className="play-button" onClick={toggleSimulation}>
                                <div className="play-icon">
                                    <img src={PlayButtonIcon}
                                        alt="Play Button"
                                        width={22.5}
                                        height={30}
                                    />
                                </div>
                            </div>

                            <h3 className="preview-title">{t('InteractiveFactorySimulation')}</h3>
                            <p className="preview-description">
                                {t('InteractiveFactorySimulationDescription')}
                            </p>

                            <button className="launch-button" onClick={toggleSimulation}>
                                {t('LaunchDemo')}
                            </button>
                        </div>
                    </>
                )
                    // #endregion
                    :
                    // #region Simulation            
                    (
                        <>
                            <div
                                className="factory-background"
                                style={{ backgroundImage: `url(${FactoryBackground})` }}
                            >

                                <section className='left-side'>
                                    <Conveyor
                                        id={"conveyor-left"}
                                        running={false}
                                        bodyIndex={89}
                                        bodyStyle={equipamentStyle({ width: 68, height: 253, left: 404, bottom: 19 })}
                                        beltStyle={equipamentStyle({ width: 68, bottom: 31, zIndex: 88, left: 0 })}
                                    />

                                    {/* Robot */}
                                    <Robot
                                        id={"robot-left"}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 153, height: 125, left: 296, bottom: 209 })}
                                        axisXStyle={equipamentStyle({ width: 153, height: 125, zIndex: 98, left: 0, bottom: 0 })}
                                        axisYStyle={equipamentStyle({ width: 153, height: 125, zIndex: 97, left: 0, bottom: 0 })}
                                        moveToHome={true}
                                        moveToPick={false}
                                        moveToAntecipation={false}
                                        moveToDrop={false}
                                    />
                                </section>


                                {/* Right Side */}
                                {/* <img src={Conveyor4mBody} alt="Conveyor 4m Body (Right)" style={equipamentStyle({ width: 63, height: 253, right: 388, bottom: 19 })} /> */}
                                <img src={RobotRightBody} alt="Robot Right Body" style={equipamentStyle({ width: 153, height: 125, zIndex: 99, right: 275, bottom: 209 })} />
                                <img src={RobotRightAxisX} alt="Robot Right Axis X" style={equipamentStyle({ width: 153, height: 125, zIndex: 98, right: 275, bottom: 209 })} />
                                <img src={RobotRightAxisY} alt="Robot Right Axis Y" style={equipamentStyle({ width: 153, height: 125, zIndex: 97, right: 275, bottom: 209 })} />
                            </div>
                        </>
                    )
                // #endregion
            }
        </StylePlayFactory>
    );
}
