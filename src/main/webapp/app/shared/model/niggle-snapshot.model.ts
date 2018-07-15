import { Moment } from 'moment';

export const enum Status {
    SUBMITTED = 'SUBMITTED',
    OPEN = 'OPEN',
    WINTER_WORK = 'WINTER_WORK',
    IN_PROGRESS = 'IN_PROGRESS',
    ON_HOLD = 'ON_HOLD',
    COMPLETED = 'COMPLETED',
    CLOSED = 'CLOSED',
    TBR = 'TBR'
}

export const enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export interface INiggleSnapshot {
    id?: number;
    date?: Moment;
    status?: Status;
    priority?: Priority;
    count?: number;
    ageOfOldest?: number;
}

export class NiggleSnapshot implements INiggleSnapshot {
    constructor(
        public id?: number,
        public date?: Moment,
        public status?: Status,
        public priority?: Priority,
        public count?: number,
        public ageOfOldest?: number
    ) {}
}
