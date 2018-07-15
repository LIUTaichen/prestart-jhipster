import { ICompetency } from 'app/shared/model//competency.model';
import { IPrestartCheckConfig } from 'app/shared/model//prestart-check-config.model';

export const enum MaintenanceGroup {
    YELLOW_FLEET = 'YELLOW_FLEET',
    WHITE_FLEET = 'WHITE_FLEET'
}

export interface ICategory {
    id?: number;
    category?: string;
    description?: string;
    type?: string;
    trackUsage?: boolean;
    dailyRate?: number;
    loadCapacity?: number;
    hourlyRate?: number;
    isEarchMovingPlant?: boolean;
    isTrackedForInternalBilling?: boolean;
    maintenanceGroup?: MaintenanceGroup;
    competency?: ICompetency;
    prestartCheckConfig?: IPrestartCheckConfig;
}

export class Category implements ICategory {
    constructor(
        public id?: number,
        public category?: string,
        public description?: string,
        public type?: string,
        public trackUsage?: boolean,
        public dailyRate?: number,
        public loadCapacity?: number,
        public hourlyRate?: number,
        public isEarchMovingPlant?: boolean,
        public isTrackedForInternalBilling?: boolean,
        public maintenanceGroup?: MaintenanceGroup,
        public competency?: ICompetency,
        public prestartCheckConfig?: IPrestartCheckConfig
    ) {
        this.trackUsage = false;
        this.isEarchMovingPlant = false;
        this.isTrackedForInternalBilling = false;
    }
}
