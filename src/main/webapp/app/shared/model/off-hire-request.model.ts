export interface IOffHireRequest {
    id?: number;
}

export class OffHireRequest implements IOffHireRequest {
    constructor(public id?: number) {}
}
