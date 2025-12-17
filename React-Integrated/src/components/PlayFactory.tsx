import { StylePlayFactory } from './styles/PlayFactory';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import BigConveyor from './BigConveyor';
import Conveyor from './Conveyor';
import Robot, {type RobotMovement} from './Robot';
import Actuator from './Actuator';
import Part from './Part';
import PlayButtonIcon from '../assets/icons/play-button-icon.svg';
import FactoryBackground from '../assets/images/factory-background.svg';

// Adicionar um efeito de sombra no arco da esteira para dar profundidade 

const BASE_WIDTH = 1024;
const BASE_HEIGHT = 590;

export function PlayFactory() {
    // Test variables after delete
    const [bigConveyorRunning, setBigConveyorRunning] = useState<boolean>(false);
    const [conveyorLeftRunning, setConveyorLeftRunning] = useState<boolean>(false);
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

    const { t } = useTranslation();
    const [simulationStart, setSimulationStart] = useState<boolean>(false);
    const [screenHeight, setScreenHeight] = useState<number>(BASE_HEIGHT);
    const screenRef = useRef<HTMLDivElement>(null);

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
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {/* Conveyor Left Running Button */}
                <button
                    onClick={() => setConveyorLeftRunning(!conveyorLeftRunning)}
                    style={styleTestButtons(conveyorLeftRunning)}
                >
                    Conveyor Left: {conveyorLeftRunning ? 'ON' : 'OFF'}
                </button>

                {/* Robot Left - toHome Button */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toHome: !robotLeftMoving.toHome })}
                    style={styleTestButtons(robotLeftMoving.toHome)}
                >
                    Robot toHome: {robotLeftMoving.toHome ? 'ON' : 'OFF'}
                </button>

                {/* Robot Left - toPick Button */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toPick: !robotLeftMoving.toPick })}
                    style={styleTestButtons(robotLeftMoving.toPick)}
                >
                    Robot toPick: {robotLeftMoving.toPick ? 'ON' : 'OFF'}
                </button>

                {/* Robot Left - toAntecipation Button */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toAntecipation: !robotLeftMoving.toAntecipation })}
                    style={styleTestButtons(robotLeftMoving.toAntecipation)}
                >
                    Robot toAntecipation: {robotLeftMoving.toAntecipation ? 'ON' : 'OFF'}
                </button>

                {/* Robot Left - toDrop Button */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, toDrop: !robotLeftMoving.toDrop })}
                    style={styleTestButtons(robotLeftMoving.toDrop)}
                >
                    Robot toDrop: {robotLeftMoving.toDrop ? 'ON' : 'OFF'}
                </button>
                {/* Robot Left - isGrabbed */}
                <button
                    onClick={() => setRobotLeftMoving({ ...robotLeftMoving, isGrabbed: !robotLeftMoving.isGrabbed })}
                    style={styleTestButtons(robotLeftMoving.isGrabbed)}
                >
                    Robot isGrabbed: {robotLeftMoving.isGrabbed ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setBigConveyorRunning(!bigConveyorRunning)}
                    style={styleTestButtons(bigConveyorRunning)}
                >
                    Big Conveyor Running: {bigConveyorRunning ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setActuatorAMoving({ ...actuatorAMoving, advance: !actuatorAMoving.advance})}
                    style={styleTestButtons(actuatorAMoving.advance)}
                >
                    Actuator A Advance: {actuatorAMoving.advance ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setActuatorAMoving({ ...actuatorAMoving, retract: !actuatorAMoving.retract})}
                    style={styleTestButtons(actuatorAMoving.retract)}
                >
                    Actuator A Retract: {actuatorAMoving.retract ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setActuatorBMoving({ ...actuatorBMoving, advance: !actuatorBMoving.advance})}
                    style={styleTestButtons(actuatorBMoving.advance)}
                >
                    Actuator B Advance: {actuatorBMoving.advance ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setActuatorBMoving({ ...actuatorBMoving, retract: !actuatorBMoving.retract})}
                    style={styleTestButtons(actuatorBMoving.retract)}
                >
                    Actuator B Retract: {actuatorBMoving.retract ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setActuatorCMoving({ ...actuatorCMoving, advance: !actuatorCMoving.advance})}
                    style={styleTestButtons(actuatorCMoving.advance)}
                >
                    Actuator C Advance: {actuatorCMoving.advance ? 'ON' : 'OFF'}
                </button>
                <button
                    onClick={() => setActuatorCMoving({ ...actuatorCMoving, retract: !actuatorCMoving.retract})}
                    style={styleTestButtons(actuatorCMoving.retract)}
                >
                    Actuator C Retract: {actuatorCMoving.retract ? 'ON' : 'OFF'}
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
                                        running={false}
                                        scaleFactor={getScaleCoefficient()}
                                    />
                                    <Robot
                                        id={"robot-right"}
                                        ref={robotRightRef}
                                        bodyIndex={99}
                                        bodyStyle={equipamentStyle({ width: 153, height: 125, right: 275, bottom: 209 })}
                                        moveToHome={true}
                                        moveToPick={false}
                                        moveToAntecipation={false}
                                        moveToDrop={false}
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

                                <section className='Parts'>
                                    <Part
                                        bodyIndex={90}
                                        bodyStyle={equipamentStyle({ width: 20, height: 20, left: 430, bottom: 36 })}
                                        conveyor={{
                                            ref: conveyorLeftRef,
                                            running: conveyorLeftRunning,
                                        }}
                                        robot={{
                                            ref: robotLeftRef,
                                            isGrabbed: robotLeftMoving.isGrabbed,
                                            movement: robotLeftMovement,
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
                                </section>
                            </div>
                        </>
                    )
                // #endregion
            }
        </StylePlayFactory>
    );
}
