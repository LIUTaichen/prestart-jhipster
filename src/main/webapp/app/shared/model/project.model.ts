import { Moment } from 'moment';

export interface IProject {
    id?: number;
    jobNo?: string;
    name?: string;
    location?: string;
    notes?: string;
    startDate?: Moment;
    endDate?: Moment;
    isActive?: boolean;
    isOnHold?: boolean;
    details?: string;
}

export class Project implements IProject {
    constructor(
        public id?: number,
        public jobNo?: string,
        public name?: string,
        public location?: string,
        public notes?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public isActive?: boolean,
        public isOnHold?: boolean,
        public details?: string
    ) {
        this.isActive = false;
        this.isOnHold = false;
    }
}
