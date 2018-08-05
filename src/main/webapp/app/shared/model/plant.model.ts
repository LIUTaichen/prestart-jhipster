import { Moment } from 'moment';
import { ILocation } from 'app/shared/model//location.model';
import { ICategory } from 'app/shared/model//category.model';
import { ICompany } from 'app/shared/model//company.model';
import { IMaintenanceContractor } from 'app/shared/model//maintenance-contractor.model';
import { IProject } from 'app/shared/model//project.model';

export const enum MeterUnit {
    KM = 'KM',
    HOUR = 'HOUR'
}

export const enum HireStatus {
    ONHIRE = 'ONHIRE',
    OFFHIRE = 'OFFHIRE',
    OFFBREAK = 'OFFBREAK',
    OFFSEASO = 'OFFSEASO'
}

export const enum MaintenanceType {
    METER_BASED = 'METER_BASED',
    TIME_BASED = 'TIME_BASED'
}

export interface IPlant {
    id?: number;
    fleetId?: string;
    name?: string;
    notes?: string;
    purchaseDate?: Moment;
    isActive?: boolean;
    description?: string;
    vin?: string;
    rego?: string;
    dateOfManufacture?: Moment;
    imageContentType?: string;
    image?: any;
    tankSize?: number;
    meterReading?: number;
    maintenanceDueAt?: number;
    maintenanceDueDate?: Moment;
    lastMaintenanceDate?: Moment;
    lastMaintenanceAt?: Moment;
    meterUnit?: MeterUnit;
    certificateDueDate?: Moment;
    rucDueAtKm?: number;
    hubboReading?: number;
    loadCapacity?: number;
    hourlyRate?: number;
    registrationDueDate?: Moment;
    hireStatus?: HireStatus;
    gpsDeviceSerial?: string;
    maintenanceType?: MaintenanceType;
    location?: ILocation;
    category?: ICategory;
    owner?: ICompany;
    assignedContractor?: IMaintenanceContractor;
    project?: IProject;
}

export class Plant implements IPlant {
    constructor(
        public id?: number,
        public fleetId?: string,
        public name?: string,
        public notes?: string,
        public purchaseDate?: Moment,
        public isActive?: boolean,
        public description?: string,
        public vin?: string,
        public rego?: string,
        public dateOfManufacture?: Moment,
        public imageContentType?: string,
        public image?: any,
        public tankSize?: number,
        public meterReading?: number,
        public maintenanceDueAt?: number,
        public maintenanceDueDate?: Moment,
        public lastMaintenanceDate?: Moment,
        public lastMaintenanceAt?: Moment,
        public meterUnit?: MeterUnit,
        public certificateDueDate?: Moment,
        public rucDueAtKm?: number,
        public hubboReading?: number,
        public loadCapacity?: number,
        public hourlyRate?: number,
        public registrationDueDate?: Moment,
        public hireStatus?: HireStatus,
        public gpsDeviceSerial?: string,
        public maintenanceType?: MaintenanceType,
        public location?: ILocation,
        public category?: ICategory,
        public owner?: ICompany,
        public assignedContractor?: IMaintenanceContractor,
        public project?: IProject
    ) {
        this.isActive = false;
    }
}
