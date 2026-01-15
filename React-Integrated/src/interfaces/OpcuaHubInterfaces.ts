/** Default equipment state */
export const DEFAULT_EQUIPMENT_STATE: EquipamentSubscriptionResponse = {
    ActuatorAinAdvance: false,
    ActuatorAinRetract: false,
    ActuatorBinAdvance: false,
    ActuatorBinRetract: false,
    ActuatorCinAdvance: false,
    ActuatorCinRetract: false,
    ConveyorLeftRunning: false,
    ConveyorRightRunning: false,
    BigConveyorFirstRunning: false,
    BigConveyorSecondRunning: false,
    RobotLeftToHome: false,
    RobotLeftMovingToDrop: false,
    RobotLeftToPick: false,
    RobotLeftToAntecipation: false,
    RobotLeftIsGrabbed: false,
    RobotRightToHome: false,
    RobotRightMovingToDrop: false,
    RobotRightToPick: false,
    RobotRightToAntecipation: false,
    RobotRightIsGrabbed: false,
    CreateParts: false,
};

/** Represents the backend contract for equipment states */
export interface EquipamentSubscriptionResponse {
    ActuatorAinAdvance: boolean;
    ActuatorAinRetract: boolean;
    ActuatorBinAdvance: boolean;
    ActuatorBinRetract: boolean;
    ActuatorCinAdvance: boolean;
    ActuatorCinRetract: boolean;
    ConveyorLeftRunning: boolean;
    ConveyorRightRunning: boolean;
    BigConveyorFirstRunning: boolean; // changed
    BigConveyorSecondRunning: boolean; // changed
    RobotLeftToHome: boolean;
    RobotLeftMovingToDrop: boolean;
    RobotLeftToPick: boolean;
    RobotLeftToAntecipation: boolean;
    RobotLeftIsGrabbed: boolean;
    RobotRightToHome: boolean;
    RobotRightMovingToDrop: boolean;
    RobotRightToPick: boolean;
    RobotRightToAntecipation: boolean;
    RobotRightIsGrabbed: boolean;
    CreateParts: boolean;
}

/** Represents an OPC UA node response from the server */
export interface OpcuaNodeResponse {
    name: string;
    value: number | string | boolean;
}
