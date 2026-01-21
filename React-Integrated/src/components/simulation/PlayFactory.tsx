import { StylePlayFactory } from '@styles/PlayFactory';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import BigConveyor from './BigConveyor';
import Conveyor from './Conveyor';
import Robot, { type RobotMovement } from './Robot';
import Actuator from './Actuator';
import Part from './Part';
import PlayButtonIcon from '@assets/icons/play-button-icon.svg';
import FactoryBackground from '@assets/images/factory-background.svg';
import type { EquipamentSubscriptionResponse } from '@interfaces/OpcuaHubInterfaces';

const BASE_WIDTH = 1024;
const BASE_HEIGHT = 590;

// Parts state management
interface PartData {
    id: number;
    position: 'left' | 'right';
    svgColor: 'metal' | 'green' | 'blue';
}

interface PlayFactoryProps {
    simulationStart: boolean;
    setSimulationStart: React.Dispatch<React.SetStateAction<boolean>>;
    equipmentsValue: EquipamentSubscriptionResponse;
}

export default function PlayFactory({ simulationStart, setSimulationStart, equipmentsValue }: PlayFactoryProps) {
    // #region States, Refs
    const { t } = useTranslation();
    const [screenHeight, setScreenHeight] = useState<number>(BASE_HEIGHT);
    const [parts, setParts] = useState<PartData[]>([]);
    const screenRef = useRef<HTMLDivElement>(null);
    const nextPartId = useRef<number>(0);
    const lastCreatePartsRef = useRef<boolean>(false);

    // Conveyor stop override states (when part reaches stop-area)
    const [conveyorLeftStopped, setConveyorLeftStopped] = useState<boolean>(false);
    const [conveyorRightStopped, setConveyorRightStopped] = useState<boolean>(false);

    // Big conveyor stop override state (when part reaches color-specific stop-area)
    const [bigConveyorSecondStopped, setBigConveyorSecondStopped] = useState<boolean>(false);

    // Equipament auxs
    const [robotLeftMovement, setRobotLeftMovement] = useState<RobotMovement>({
        x: {
            transformPx: 0,
            transitionMs: 0
        }, y: {
            transformPx: 0,
            transitionMs: 0
        }
    });
    const [robotRightMovement, setRobotRightMovement] = useState<RobotMovement>({
        x: {
            transformPx: 0,
            transitionMs: 0
        }, y: {
            transformPx: 0,
            transitionMs: 0
        }
    });

    // Equipment refs
    const conveyorLeftRef = useRef<HTMLDivElement>(null);
    const conveyorRightRef = useRef<HTMLDivElement>(null);
    const robotLeftRef = useRef<HTMLDivElement>(null);
    const robotRightRef = useRef<HTMLDivElement>(null);
    const bigConveyorFirstRef = useRef<HTMLDivElement>(null);
    const bigConveyorSecondRef = useRef<HTMLDivElement>(null);
    const actuatorCRef = useRef<HTMLDivElement>(null);
    const actuatorBRef = useRef<HTMLDivElement>(null);
    const actuatorARef = useRef<HTMLDivElement>(null);

    // #endregion

    // #region Functions, Callbacks

    // Function to create 2 parts
    const createTwoParts = useCallback(() => {
        let svgColor: 'metal' | 'green' | 'blue';
        if (equipmentsValue.MetalPartSelected) {
            svgColor = 'metal';
        } else if (equipmentsValue.GreenPartSelected) {
            svgColor = 'green';
        } else if (equipmentsValue.BluePartSelected) {
            svgColor = 'blue';
        } else {
            svgColor = 'metal';
        }

        const newParts: PartData[] = [
            { id: nextPartId.current, position: 'left', svgColor },
            { id: nextPartId.current + 1, position: 'right', svgColor }
        ];
        setParts(prev => [...prev, ...newParts]);
        nextPartId.current += 2;
    }, [equipmentsValue.MetalPartSelected, equipmentsValue.GreenPartSelected, equipmentsValue.BluePartSelected]);

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
        ...(params.top !== undefined && { top: scale(params.top) }),
        ...(params.left !== undefined && { left: scale(params.left) }),
        ...(params.bottom !== undefined && { bottom: scale(params.bottom) }),
        ...(params.right !== undefined && { right: scale(params.right) }),
    })

    const toggleSimulation = () => {
        setSimulationStart(!simulationStart);
    }

    // Callbacks for when parts reach stop-area
    const handleLeftPartStopAreaReached = useCallback(() => {
        setConveyorLeftStopped(true);
    }, []);

    const handleRightPartStopAreaReached = useCallback(() => {
        setConveyorRightStopped(true);
    }, []);

    // Callback for when part reaches big conveyor stop-area
    const handleBigConveyorStopAreaReached = useCallback(() => {
        setBigConveyorSecondStopped(true);
    }, []);

    // Reset conveyor stopped state when robot grabs the part
    useEffect(() => {
        if (equipmentsValue.RobotLeftToAntecipation && conveyorLeftStopped) {
            setConveyorLeftStopped(false);
        }
    }, [equipmentsValue.RobotLeftToAntecipation, conveyorLeftStopped]);

    useEffect(() => {
        if (equipmentsValue.RobotRightToAntecipation && conveyorRightStopped) {
            setConveyorRightStopped(false);
        }
    }, [equipmentsValue.RobotRightToAntecipation, conveyorRightStopped]);

    // Reset big conveyor stopped state when any actuator advances (pushes the part)
    useEffect(() => {
        const anyActuatorAdvancing = equipmentsValue.ActuatorAinAdvance || equipmentsValue.ActuatorBinAdvance || equipmentsValue.ActuatorCinAdvance;
        if (anyActuatorAdvancing && bigConveyorSecondStopped) {
            setBigConveyorSecondStopped(false);
        }
    }, [equipmentsValue.ActuatorAinAdvance, equipmentsValue.ActuatorBinAdvance, equipmentsValue.ActuatorCinAdvance, bigConveyorSecondStopped]);

    // Trigger createTwoParts when CreateParts becomes true
    useEffect(() => {
        if ((equipmentsValue.BluePartSelected || equipmentsValue.GreenPartSelected || equipmentsValue.MetalPartSelected) && !lastCreatePartsRef.current) {
            createTwoParts();
        }
        lastCreatePartsRef.current = (equipmentsValue.BluePartSelected || equipmentsValue.GreenPartSelected || equipmentsValue.MetalPartSelected);
    }, [equipmentsValue.BluePartSelected, equipmentsValue.GreenPartSelected, equipmentsValue.MetalPartSelected, createTwoParts]);

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
    // #endregion

    // #region Component Render
    return (
        <StylePlayFactory height={screenHeight} ref={screenRef}>
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
                                        ref={conveyorLeftRef}
                                        bodyIndex={89}
                                        bodyStyle={equipamentStyle({ width: 68, height: 253, left: 404, bottom: 19 })}
                                        beltStyle={equipamentStyle({ width: 68, bottom: 31, left: 0 })}
                                        running={equipmentsValue.ConveyorLeftRunning && !conveyorLeftStopped}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Robot
                                        id={"robot-left"}
                                        ref={robotLeftRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 153, height: 125, left: 296, bottom: 209 })}
                                        moveToHome={equipmentsValue.RobotLeftToHome}
                                        moveToPick={equipmentsValue.RobotLeftToPick}
                                        moveToAntecipation={equipmentsValue.RobotLeftToAntecipation}
                                        moveToDrop={equipmentsValue.RobotLeftMovingToDrop}
                                        setRobotMovement={setRobotLeftMovement}
                                        robotMovement={robotLeftMovement}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                </section>

                                <section className='right-side'>
                                    <Conveyor
                                        id={"conveyor-right"}
                                        ref={conveyorRightRef}
                                        bodyIndex={89}
                                        bodyStyle={equipamentStyle({ width: 68, height: 253, right: 388, bottom: 19 })}
                                        beltStyle={equipamentStyle({ width: 68, bottom: 31, right: 0 })}
                                        running={equipmentsValue.ConveyorRightRunning && !conveyorRightStopped}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Robot
                                        id={"robot-right"}
                                        ref={robotRightRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 153, height: 125, right: 275, bottom: 209 })}
                                        moveToHome={equipmentsValue.RobotRightToHome}
                                        moveToPick={equipmentsValue.RobotRightToPick}
                                        moveToAntecipation={equipmentsValue.RobotRightToAntecipation}
                                        moveToDrop={equipmentsValue.RobotRightMovingToDrop}
                                        setRobotMovement={setRobotRightMovement}
                                        robotMovement={robotRightMovement}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                </section>

                                <section className='center'>
                                    <BigConveyor
                                        id={"big-conveyor"}
                                        firstRef={bigConveyorFirstRef}
                                        secondRef={bigConveyorSecondRef}
                                        bodyIndex={89}
                                        bodyStyle={equipamentStyle({ width: 186, height: 369, top: 36, right: 354 })}
                                        firstBeltStyle={equipamentStyle({ width: 56, height: 97, bottom: 31, left: 0 })}
                                        secondBeltStyle={equipamentStyle({ width: 56, height: 243, bottom: 97 + 31, left: 0 })} // bottom = firstBeltStyle.height + firstBeltStyle.bottom
                                        firstRunning={equipmentsValue.BigConveyorFirstRunning}
                                        secondRunning={equipmentsValue.BigConveyorSecondRunning && !bigConveyorSecondStopped}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Actuator
                                        id={"actuator-c"}
                                        ref={actuatorCRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 144, height: 44, top: 63, left: 412 })}
                                        axisStyle={equipamentStyle({ width: 144, height: 44, top: 0, left: -56 })}
                                        advance={equipmentsValue.ActuatorCinAdvance}
                                        retract={equipmentsValue.ActuatorCinRetract}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Actuator
                                        id={"actuator-b"}
                                        ref={actuatorBRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 144, height: 44, top: 135, left: 412 })}
                                        axisStyle={equipamentStyle({ width: 144, height: 44, top: 0, left: -56 })}
                                        advance={equipmentsValue.ActuatorBinAdvance}
                                        retract={equipmentsValue.ActuatorBinRetract}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Actuator
                                        id={"actuator-a"}
                                        ref={actuatorARef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 144, height: 44, top: 206, left: 412 })}
                                        axisStyle={equipamentStyle({ width: 144, height: 44, bottom: 0, left: -56 })}
                                        advance={equipmentsValue.ActuatorAinAdvance}
                                        retract={equipmentsValue.ActuatorAinRetract}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                </section>

                                <section className='parts'>
                                    {parts.map((part) => (
                                        <Part
                                            key={part.id}
                                            svgColor={part.svgColor}
                                            bodyIndex={90}
                                            bodyStyle={equipamentStyle({
                                                width: 20,
                                                height: 20,
                                                ...(part.position === 'left' ? { left: 430 } : { right: 410 }), // left: 510 (bigconveyor test)
                                                bottom: 36 // 206 (bigconveyor test)
                                            })}
                                            conveyor={{
                                                ref: part.position === 'left' ? conveyorLeftRef : conveyorRightRef,
                                                running: part.position === 'left'
                                                    ? (equipmentsValue.ConveyorLeftRunning && !conveyorLeftStopped)
                                                    : (equipmentsValue.ConveyorRightRunning && !conveyorRightStopped),
                                                onStopAreaReached: part.position === 'left' ? handleLeftPartStopAreaReached : handleRightPartStopAreaReached
                                            }}

                                            robot={{
                                                ref: part.position === 'left' ? robotLeftRef : robotRightRef,
                                                isGrabbed: part.position === 'left' ? equipmentsValue.RobotLeftIsGrabbed : equipmentsValue.RobotRightIsGrabbed,
                                                movement: part.position === 'left' ? robotLeftMovement : robotRightMovement,
                                            }}
                                            bigConveyor={{
                                                firstRef: bigConveyorFirstRef,
                                                secondRef: bigConveyorSecondRef,
                                                firstRunning: equipmentsValue.BigConveyorFirstRunning,
                                                secondRunning: equipmentsValue.BigConveyorSecondRunning && !bigConveyorSecondStopped,
                                                onStopAreaReached: handleBigConveyorStopAreaReached,
                                            }}
                                            actuatorA={{
                                                ref: actuatorARef,
                                                movement: { advance: equipmentsValue.ActuatorAinAdvance, retract: equipmentsValue.ActuatorAinRetract }
                                            }}
                                            actuatorB={{
                                                ref: actuatorBRef,
                                                movement: { advance: equipmentsValue.ActuatorBinAdvance, retract: equipmentsValue.ActuatorBinRetract }
                                            }}
                                            actuatorC={{
                                                ref: actuatorCRef,
                                                movement: { advance: equipmentsValue.ActuatorCinAdvance, retract: equipmentsValue.ActuatorCinRetract }
                                            }}
                                            scaleFactor={getScaleCoefficient()}
                                        />
                                    ))}
                                </section>
                            </div>
                        </>
                    )
                // #endregion
            }
        </StylePlayFactory>
    );
    // #endregion
}
