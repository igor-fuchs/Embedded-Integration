import { StylePlayFactory } from './styles/PlayFactory';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import PlayButtonIcon from '../assets/icons/play-button-icon.svg';
import testeImage from '../assets/images/teste-image.png';
import testeImage2 from '../assets/images/background-factory.svg';

// Adicionar um efeito de sombra no arco da esteira para dar profundidade 




export function PlayFactory() {
    const { t } = useTranslation();
    const [simulationStart, setSimulationStart] = useState(false);

    const toggleSimulation = () => {
        setSimulationStart(!simulationStart);
    }

    return (
        <StylePlayFactory>
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
                            <img
                                src={testeImage2}
                                alt="Factory Simulation"
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                        </>
                    )
                // #endregion
            }
        </StylePlayFactory>
    );
}
