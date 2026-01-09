import { StyleLiveDemo } from "@styles/LiveDemo";
import { useTranslation } from "react-i18next";
import PlayFactory from "@simulation/PlayFactory";
import FactoryButtons from "@simulation/FactoryButtons";
import { useCallback, useEffect, useState } from "react";
import { OpcuaNodesApi } from "@lib/api-client";
import { useOpcuaNodeHub, type ConnectionStatus, type OpcuaNodeResponse } from "@hooks/useOpcuaNodeHub";

export default function LiveDemo() {
    const { t } = useTranslation();

    const [simulationStart, setSimulationStart] = useState<boolean>(false);

    // Memoized handlers to prevent unnecessary reconnections
    const handleSimulationFrontNode = useCallback((node: OpcuaNodeResponse) => {
        console.log('Simulation front node updated:', node);
    }, []);

    const handleSimulationFrontInitialState = useCallback((nodes: OpcuaNodeResponse[]) => {
        console.log('Simulation front initial state received:', nodes);
    }, []);

    const handleConnectionChange = useCallback((status: ConnectionStatus) => {
        console.log('Connection status:', status);
    }, []);

    // SignalR Hub connection
    const { status, isConnected, error } = useOpcuaNodeHub(
        {
            onSimulationFrontNode: handleSimulationFrontNode,
            onSimulationFrontInitialState: handleSimulationFrontInitialState,
            onConnectionChange: handleConnectionChange,
        },
        {
            enabled: simulationStart,
            autoReconnect: true,
        }
    );

    // Fetch initial nodes when simulation starts
    useEffect(() => {
        if (!simulationStart) return;

        const api = new OpcuaNodesApi();
        api.getNodes()
            .then((response) => {
                console.log('OPC UA Nodes:', response);
            })
            .catch((err) => {
                console.error('Failed to fetch nodes:', err);
            });
    }, [simulationStart]);

    // Debug logging
    useEffect(() => {
        if (import.meta.env.DEV) {
            console.log('[LiveDemo] Hub status:', status, '| Error:', error, '| Connected:', isConnected);
        }
    }, [status, error]);

    return (
        <StyleLiveDemo id="Demo">
            <div className="demo-container">
                <div className="demo-content">
                    <div className="demo-header">
                        <h2 className="demo-title">{t('LiveDemo')}</h2>
                        <p className="demo-description">
                            {t('LiveDemoDescription')}
                        </p>
                    </div>

                    {/* Simulation Card */}
                    <div className="demo-card">
                        <PlayFactory
                            simulationStart={simulationStart}
                            setSimulationStart={setSimulationStart}
                        />
                        <FactoryButtons />
                    </div>
                </div>
            </div>
        </StyleLiveDemo>
    );
}
