import { IPlantLog } from 'app/shared/model//plant-log.model';
import { IImage } from 'app/shared/model//image.model';

export const enum IncidentType {
    NONE = 'NONE',
    DAMAGE = 'DAMAGE',
    WEAR_AND_TEAR = 'WEAR_AND_TEAR'
}

export interface IPlantAudit {
    id?: number;
    notes?: string;
    tyreOrTrackOrRollerFrontLeft?: boolean;
    tyreOrTrackOrRollerFrontRight?: boolean;
    controlLeft?: boolean;
    controlRight?: boolean;
    tyreOrTrackOrRollerRearLeft?: boolean;
    tyreOrTrackOrRollerRearRight?: boolean;
    drive?: boolean;
    steeringLeft?: boolean;
    steeringRight?: boolean;
    hoistLeft?: boolean;
    hoistRight?: boolean;
    ejector?: boolean;
    oilLevel?: boolean;
    coolant?: boolean;
    hydraulics?: boolean;
    cab?: boolean;
    bonnet?: boolean;
    body?: boolean;
    binFront?: boolean;
    binLeft?: boolean;
    binRight?: boolean;
    binInside?: boolean;
    tailGate?: boolean;
    leftGuard?: boolean;
    leftStairs?: boolean;
    rightGuard?: boolean;
    rightStairs?: boolean;
    incidenType?: IncidentType;
    plantLog?: IPlantLog;
    photos?: IImage[];
}

export class PlantAudit implements IPlantAudit {
    constructor(
        public id?: number,
        public notes?: string,
        public tyreOrTrackOrRollerFrontLeft?: boolean,
        public tyreOrTrackOrRollerFrontRight?: boolean,
        public controlLeft?: boolean,
        public controlRight?: boolean,
        public tyreOrTrackOrRollerRearLeft?: boolean,
        public tyreOrTrackOrRollerRearRight?: boolean,
        public drive?: boolean,
        public steeringLeft?: boolean,
        public steeringRight?: boolean,
        public hoistLeft?: boolean,
        public hoistRight?: boolean,
        public ejector?: boolean,
        public oilLevel?: boolean,
        public coolant?: boolean,
        public hydraulics?: boolean,
        public cab?: boolean,
        public bonnet?: boolean,
        public body?: boolean,
        public binFront?: boolean,
        public binLeft?: boolean,
        public binRight?: boolean,
        public binInside?: boolean,
        public tailGate?: boolean,
        public leftGuard?: boolean,
        public leftStairs?: boolean,
        public rightGuard?: boolean,
        public rightStairs?: boolean,
        public incidenType?: IncidentType,
        public plantLog?: IPlantLog,
        public photos?: IImage[]
    ) {
        this.tyreOrTrackOrRollerFrontLeft = false;
        this.tyreOrTrackOrRollerFrontRight = false;
        this.controlLeft = false;
        this.controlRight = false;
        this.tyreOrTrackOrRollerRearLeft = false;
        this.tyreOrTrackOrRollerRearRight = false;
        this.drive = false;
        this.steeringLeft = false;
        this.steeringRight = false;
        this.hoistLeft = false;
        this.hoistRight = false;
        this.ejector = false;
        this.oilLevel = false;
        this.coolant = false;
        this.hydraulics = false;
        this.cab = false;
        this.bonnet = false;
        this.body = false;
        this.binFront = false;
        this.binLeft = false;
        this.binRight = false;
        this.binInside = false;
        this.tailGate = false;
        this.leftGuard = false;
        this.leftStairs = false;
        this.rightGuard = false;
        this.rightStairs = false;
    }
}
