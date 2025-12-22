import { StylePlayFactory } from '@styles/PlayFactory';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import BigConveyor from './BigConveyor';
import Conveyor from './Conveyor';
import Robot, { type RobotMovement } from './Robot';
import Actuator from './Actuator';
import Part from './Part';
import PlayButtonIcon from '@assets/icons/play-button-icon.svg';
import FactoryBackground from '@assets/images/factory-background.svg';

// Adicionar um efeito de sombra no arco da esteira para dar profundidade 

const BASE_WIDTH = 1024;
const BASE_HEIGHT = 590;

// Parts state management
interface PartData {
    id: number;
    position: 'left' | 'right';
}

export function PlayFactory() {
    // #region Test States
    // Test variables after delete
    const [bigConveyorRunning, setBigConveyorRunning] = useState<boolean>(false);
    const [conveyorLeftRunning, setConveyorLeftRunning] = useState<boolean>(false);
    const [conveyorRightRunning, setConveyorRightRunning] = useState<boolean>(false);
    const [robotLeftMoving, setRobotLeftMoving] = useState<{
        toHome: boolean;
        toPick: boolean;
        toAntecipation: boolean;
        toDrop: boolean;
        isGrabbed: boolean;
    }>({
        toHome: false,
        toPick: false,
        toAntecipation: false,
        toDrop: false,
        isGrabbed: false,
    });
    const [robotRightMoving, setRobotRightMoving] = useState<{
        toHome: boolean;
        toPick: boolean;
        toAntecipation: boolean;
        toDrop: boolean;
        isGrabbed: boolean;
    }>({
        toHome: false,
        toPick: false,
        toAntecipation: false,
        toDrop: false,
        isGrabbed: false,
    });
    const [actuatorAMoving, setActuatorAMoving] = useState<{ retract: boolean, advance: boolean }>({ retract: false, advance: false });
    const [actuatorBMoving, setActuatorBMoving] = useState<{ retract: boolean, advance: boolean }>({ retract: false, advance: false });
    const [actuatorCMoving, setActuatorCMoving] = useState<{ retract: boolean, advance: boolean }>({ retract: false, advance: false });

    const styleTestButtons = (value: boolean): React.CSSProperties => ({
        padding: '10px 10px',
        backgroundColor: value ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
    });

    // #endregion

    // #region States, Refs
    const { t } = useTranslation();
    const [simulationStart, setSimulationStart] = useState<boolean>(false);
    const [screenHeight, setScreenHeight] = useState<number>(BASE_HEIGHT);
    const [parts, setParts] = useState<PartData[]>([]);
    const screenRef = useRef<HTMLDivElement>(null);
    const nextPartId = useRef<number>(0);

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
    const bigConveyorRef = useRef<HTMLDivElement>(null);
    const actuatorCRef = useRef<HTMLDivElement>(null);
    const actuatorBRef = useRef<HTMLDivElement>(null);
    const actuatorARef = useRef<HTMLDivElement>(null);

    // #endregion

    // #region Functions, Callbacks

    // Function to create 2 parts
    const createTwoParts = () => {
        const newParts: PartData[] = [
            { id: nextPartId.current, position: 'left' },
            { id: nextPartId.current + 1, position: 'right' }
        ];
        setParts(prev => [...prev, ...newParts]);
        nextPartId.current += 2;
    };

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
            {/* Window Controls */}
            <div className="window-controls">
                <div className="control-dot green"></div>
                <div className="control-dot yellow"></div>
                <div className="control-dot blue"></div>
            </div>

            {/* Test Buttons - Remove after validation */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {/* Left Conveyor Control */}
                <button
                    onClick={() => setConveyorLeftRunning(!conveyorLeftRunning)}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: conveyorLeftRunning ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Left Conveyor: {conveyorLeftRunning ? 'ON' : 'OFF'}
                </button>

                {/* Left Robot Home Control */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toHome: !robotLeftMoving.toHome })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotLeftMoving.toHome ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Left Robot Home: {robotLeftMoving.toHome ? 'ON' : 'OFF'}
                </button>

                {/* Left Robot Pick Control */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toPick: !robotLeftMoving.toPick })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotLeftMoving.toPick ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Left Robot Pick: {robotLeftMoving.toPick ? 'ON' : 'OFF'}
                </button>

                {/* Left Robot Antecipation Control */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toHome: !robotLeftMoving.toAntecipation })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotLeftMoving.toAntecipation ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Left Robot Antecipation: {robotLeftMoving.toAntecipation ? 'ON' : 'OFF'}
                </button>

                {/* Left Robot Drop Control */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toDrop: !robotLeftMoving.toDrop })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotLeftMoving.toDrop ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Left Robot Drop: {robotLeftMoving.toDrop ? 'ON' : 'OFF'}
                </button>

                {/* Left Robot Grab */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, isGrabbed: !robotLeftMoving.isGrabbed })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotLeftMoving.isGrabbed ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Left Robot Grab: {robotLeftMoving.isGrabbed ? 'ON' : 'OFF'}
                </button>

                {/* SPACE BETWEEN */}
                <button
                    style={{
                        padding: '10px 15px',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                   
                </button>

                {/* Right Conveyor Control */}
                <button
                    onClick={() => setConveyorRightRunning(!conveyorRightRunning)}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: conveyorRightRunning ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Right Conveyor: {conveyorRightRunning ? 'ON' : 'OFF'}
                </button>

                {/* Right Robot Home Control */}
                <button
                    onClick={() => setRobotRightMoving({ ...robotRightMoving, toHome: !robotRightMoving.toHome })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotRightMoving.toHome ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Right Robot Home: {robotRightMoving.toHome ? 'ON' : 'OFF'}
                </button>

                {/* Right Robot Pick Control */}
                <button
                    onClick={() => setRobotRightMoving({ ...robotRightMoving, toPick: !robotRightMoving.toPick })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotRightMoving.toPick ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Right Robot Pick: {robotRightMoving.toPick ? 'ON' : 'OFF'}
                </button>

                {/* Right Robot Antecipation Control */}
                <button
                    onClick={() => setRobotRightMoving({ ...robotRightMoving, toAntecipation: !robotRightMoving.toAntecipation })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotRightMoving.toAntecipation ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Right Robot Antecipation: {robotRightMoving.toAntecipation ? 'ON' : 'OFF'}
                </button>

                {/* Right Robot Drop Control */}
                <button
                    onClick={() => setRobotRightMoving({ ...robotRightMoving, toDrop: !robotRightMoving.toDrop })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotRightMoving.toDrop ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Right Robot Drop: {robotRightMoving.toDrop ? 'ON' : 'OFF'}
                </button>

                {/* Right Robot Grab */}
                <button
                    onClick={() => setRobotRightMoving({ ...robotRightMoving, isGrabbed: !robotRightMoving.isGrabbed })}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: robotRightMoving.isGrabbed ? 'rgba(76, 175, 80, 0.7)' : 'rgba(200, 200, 200, 0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        minWidth: '150px',
                    }}
                >
                    Right Robot Grab: {robotRightMoving.isGrabbed ? 'ON' : 'OFF'}
                </button>
            </div>

            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {/* Big Conveyor Running Button */}
                <button
                    onClick={() => setBigConveyorRunning(!bigConveyorRunning)}
                    style={styleTestButtons(bigConveyorRunning)}
                >
                    Big Conveyor: {bigConveyorRunning ? 'ON' : 'OFF'}
                </button>

                {/* Actuator A Advance Button */}
                <button
                    onClick={() => setActuatorAMoving({ ...actuatorAMoving, advance: !actuatorAMoving.advance, retract: actuatorAMoving.advance })}
                    style={styleTestButtons(actuatorAMoving.advance)}
                >
                    Actuator A: {actuatorAMoving.advance ? 'ON' : 'OFF'}
                </button>

                {/* Actuator B Advance Button */}
                <button
                    onClick={() => setActuatorBMoving({ ...actuatorBMoving, advance: !actuatorBMoving.advance, retract: actuatorBMoving.advance })}
                    style={styleTestButtons(actuatorBMoving.advance)}
                >
                    Actuator B: {actuatorBMoving.advance ? 'ON' : 'OFF'}
                </button>

                {/* Actuator C Advance Button */}
                <button
                    onClick={() => setActuatorCMoving({ ...actuatorCMoving, advance: !actuatorCMoving.advance, retract: actuatorCMoving.advance })}
                    style={styleTestButtons(actuatorCMoving.advance)}
                >
                    Actuator C: {actuatorCMoving.advance ? 'ON' : 'OFF'}
                </button>

                {/* Create Parts Trigger */}
                <button
                    onClick={createTwoParts}
                    style={{
                        padding: '10px 10px',
                        backgroundColor: 'rgba(33, 150, 243, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                    }}
                >
                    Create 2 Parts ({parts.length} total)
                </button>

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
                                        ref={conveyorLeftRef}
                                        bodyIndex={89}
                                        bodyStyle={equipamentStyle({ width: 68, height: 253, left: 404, bottom: 19 })}
                                        beltStyle={equipamentStyle({ width: 68, bottom: 31, left: 0 })}
                                        running={conveyorLeftRunning}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Robot
                                        id={"robot-left"}
                                        ref={robotLeftRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 153, height: 125, left: 296, bottom: 209 })}
                                        moveToHome={robotLeftMoving.toHome}
                                        moveToPick={robotLeftMoving.toPick}
                                        moveToAntecipation={robotLeftMoving.toAntecipation}
                                        moveToDrop={robotLeftMoving.toDrop}
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
                                        running={conveyorRightRunning}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Robot
                                        id={"robot-right"}
                                        ref={robotRightRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 153, height: 125, right: 275, bottom: 209 })}
                                        moveToHome={robotRightMoving.toHome}
                                        moveToPick={robotRightMoving.toPick}
                                        moveToAntecipation={robotRightMoving.toAntecipation}
                                        moveToDrop={robotRightMoving.toDrop}
                                        setRobotMovement={setRobotRightMovement}
                                        robotMovement={robotRightMovement}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                </section>

                                <section className='center'>
                                    <BigConveyor
                                        id={"big-conveyor"}
                                        ref={bigConveyorRef}
                                        bodyIndex={89}
                                        bodyStyle={equipamentStyle({ width: 186, height: 369, top: 36, right: 354 })}
                                        beltStyle={equipamentStyle({ width: 56, bottom: 31, left: 0 })}
                                        running={bigConveyorRunning}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Actuator
                                        id={"actuator-c"}
                                        ref={actuatorCRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 144, height: 44, top: 63, left: 412 })}
                                        axisStyle={equipamentStyle({ width: 144, height: 44, top: 0, left: -56 })}
                                        advance={actuatorCMoving.advance}
                                        retract={actuatorCMoving.retract}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Actuator
                                        id={"actuator-b"}
                                        ref={actuatorBRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 144, height: 44, top: 135, left: 412 })}
                                        axisStyle={equipamentStyle({ width: 144, height: 44, top: 0, left: -56 })}
                                        advance={actuatorBMoving.advance}
                                        retract={actuatorBMoving.retract}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Actuator
                                        id={"actuator-a"}
                                        ref={actuatorARef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 144, height: 44, top: 206, left: 412 })}
                                        axisStyle={equipamentStyle({ width: 144, height: 44, bottom: 0, left: -56 })}
                                        advance={actuatorAMoving.advance}
                                        retract={actuatorAMoving.retract}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                </section>

                                <section className='parts'>
                                    {parts.map((part) => (
                                        <Part
                                            key={part.id}
                                            bodyIndex={90}
                                            bodyStyle={equipamentStyle({
                                                width: 20,
                                                height: 20,
                                                ...(part.position === 'left' ? { left: 430 } : { right: 410 }),
                                                bottom: 36
                                            })}
                                            conveyor={{
                                                ref: part.position === 'left' ? conveyorLeftRef : conveyorRightRef,
                                                running: part.position === 'left' ? conveyorLeftRunning : conveyorRightRunning,
                                            }}
                                            robot={{
                                                ref: part.position === 'left' ? robotLeftRef : robotRightRef,
                                                isGrabbed: part.position === 'left' ? robotLeftMoving.isGrabbed : robotRightMoving.isGrabbed,
                                                movement: part.position === 'left' ? robotLeftMovement : robotRightMovement,
                                            }}
                                            bigConveyor={{
                                                ref: bigConveyorRef,
                                                running: bigConveyorRunning,
                                            }}
                                            actuatorA={{
                                                ref: actuatorARef,
                                                movement: actuatorAMoving
                                            }}
                                            actuatorB={{
                                                ref: actuatorBRef,
                                                movement: actuatorBMoving
                                            }}
                                            actuatorC={{
                                                ref: actuatorCRef,
                                                movement: actuatorCMoving
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
