import { Moment } from 'moment';
import { IPurchaseOrder } from 'app/shared/model//purchase-order.model';
import { IPlant } from 'app/shared/model//plant.model';
import { IMaintenanceContractor } from 'app/shared/model//maintenance-contractor.model';

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

export interface INiggle {
    id?: number;
    description?: string;
    status?: Status;
    note?: string;
    priority?: Priority;
    quattraReference?: string;
    quattraComments?: string;
    invoiceNo?: string;
    dateOpened?: Moment;
    dateClosed?: Moment;
    dateCompleted?: Moment;
    eta?: Moment;
    purchaseOrder?: IPurchaseOrder;
    plant?: IPlant;
    assignedContractor?: IMaintenanceContractor;
}

export class Niggle implements INiggle {
    constructor(
        public id?: number,
        public description?: string,
        public status?: Status,
        public note?: string,
        public priority?: Priority,
        public quattraReference?: string,
        public quattraComments?: string,
        public invoiceNo?: string,
        public dateOpened?: Moment,
        public dateClosed?: Moment,
        public dateCompleted?: Moment,
        public eta?: Moment,
        public purchaseOrder?: IPurchaseOrder,
        public plant?: IPlant,
        public assignedContractor?: IMaintenanceContractor
    ) {}
}
