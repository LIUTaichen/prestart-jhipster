import { Moment } from 'moment';
import { IPlant } from 'app/shared/model//plant.model';
import { IPeople } from 'app/shared/model//people.model';
import { IProject } from 'app/shared/model//project.model';

export interface IPlantLog {
    id?: number;
    meterReading?: number;
    hubboReading?: number;
    serviceDueAt?: number;
    rucDueAt?: number;
    wofDueDate?: Moment;
    cofDueDate?: Moment;
    serviceDueDate?: Moment;
    plant?: IPlant;
    operator?: IPeople;
    site?: IProject;
}

export class PlantLog implements IPlantLog {
    constructor(
        public id?: number,
        public meterReading?: number,
        public hubboReading?: number,
        public serviceDueAt?: number,
        public rucDueAt?: number,
        public wofDueDate?: Moment,
        public cofDueDate?: Moment,
        public serviceDueDate?: Moment,
        public plant?: IPlant,
        public operator?: IPeople,
        public site?: IProject
    ) {}
}
