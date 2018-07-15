export const enum Event {
    ON_HOLD = 'ON_HOLD',
    HIGH_PRIORITY = 'HIGH_PRIORITY'
}

export const enum RecipientType {
    TO = 'TO',
    CC = 'CC',
    BCC = 'BCC'
}

export interface IEmailSubscription {
    id?: number;
    event?: Event;
    email?: string;
    recipientType?: RecipientType;
}

export class EmailSubscription implements IEmailSubscription {
    constructor(public id?: number, public event?: Event, public email?: string, public recipientType?: RecipientType) {}
}
