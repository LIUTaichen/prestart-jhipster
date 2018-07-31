import { Moment } from 'moment';
import { IPlant } from 'app/shared/model//plant.model';
import { IProject } from 'app/shared/model//project.model';

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
    plant?: IPlant;
    site?: IProject;
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
        public plant?: IPlant,
        public site?: IProject
    ) {}
}
