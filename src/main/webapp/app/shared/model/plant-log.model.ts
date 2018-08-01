import { Moment } from 'moment';
import { ILocation } from 'app/shared/model//location.model';
import { IPlant } from 'app/shared/model//plant.model';

export interface IPlantLog {
    id?: number;
    notes?: string;
    meterReading?: number;
    hubboReading?: number;
    maintenanceDueAt?: number;
    rucDueAt?: number;
    certificateDueDate?: Moment;
    maintenanceDueDate?: Moment;
    operatorName?: string;
    location?: ILocation;
    plant?: IPlant;
}

export class PlantLog implements IPlantLog {
    constructor(
        public id?: number,
        public notes?: string,
        public meterReading?: number,
        public hubboReading?: number,
        public maintenanceDueAt?: number,
        public rucDueAt?: number,
        public certificateDueDate?: Moment,
        public maintenanceDueDate?: Moment,
        public operatorName?: string,
        public location?: ILocation,
        public plant?: IPlant
    ) {}
}
