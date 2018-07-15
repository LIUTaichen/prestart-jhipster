export interface IPurchaseOrder {
    id?: number;
    orderNumber?: string;
}

export class PurchaseOrder implements IPurchaseOrder {
    constructor(public id?: number, public orderNumber?: string) {}
}
