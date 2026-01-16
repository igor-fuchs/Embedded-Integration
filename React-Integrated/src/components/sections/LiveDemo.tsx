import { StyleLiveDemo } from "@styles/LiveDemo";
import { useTranslation } from "react-i18next";
import PlayFactory from "@simulation/PlayFactory";
import FactoryButtons from "@simulation/FactoryButtons";
import { useCallback, useEffect, useState } from "react";
import { useOpcuaNodeHub, type ConnectionStatus } from "@hooks/useOpcuaNodeHub";
import { DEFAULT_EQUIPMENT_STATE, type EquipamentSubscriptionResponse, type OpcuaNodeResponse } from "@interfaces/OpcuaHubInterfaces";

export default function LiveDemo() {
    const { t } = useTranslation();

    const [simulationStart, setSimulationStart] = useState<boolean>(false);
    const [equipmentsValue, setEquipmentValue] = useState<EquipamentSubscriptionResponse>(DEFAULT_EQUIPMENT_STATE);

    // Memoized handlers to prevent unnecessary reconnections
    const handleSimulationFrontNode = useCallback((node: OpcuaNodeResponse) => {
        console.log('Simulation front node received:', node.name, node.value);

        setEquipmentValue(prev => {
            // Ensure the node name exists in the equipment state
            if (node.name in prev) {
                return {
                    ...prev,
                    [node.name]: node.value.toString().toLowerCase() == 'true'
                };
            }
            return prev;
        });
    }, []);

    // Handle initial state update
    const handleSimulationFrontInitialState = useCallback((nodes: OpcuaNodeResponse[]) => {
        setEquipmentValue(prev => {
            const newState = { ...prev };
            nodes.forEach(node => {
                // Ensure the node name exists in the equipment state
                if (node.name in newState) {
                    newState[node.name as keyof EquipamentSubscriptionResponse] = node.value?.toString().toLowerCase() == 'true';
                }
            });
            return newState;
        });
    }, []);

    // Handle connection status changes
    const handleConnectionChange = useCallback((status: ConnectionStatus) => {
        console.debug('Connection status:', status); // Criar loading
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
                    <div className="demo-card" >
                        <PlayFactory
                            simulationStart={simulationStart}
                            setSimulationStart={setSimulationStart}
                            equipmentsValue={equipmentsValue}
                        />
                        <FactoryButtons />
                    </div>
                </div>
            </div>
        </StyleLiveDemo>
    );
}
