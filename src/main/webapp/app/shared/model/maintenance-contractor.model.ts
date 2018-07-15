export interface IMaintenanceContractor {
    id?: number;
    name?: string;
}

export class MaintenanceContractor implements IMaintenanceContractor {
    constructor(public id?: number, public name?: string) {}
}
