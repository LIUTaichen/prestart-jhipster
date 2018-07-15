export interface IPeople {
    id?: number;
    email?: string;
    phone?: string;
    name?: string;
}

export class People implements IPeople {
    constructor(public id?: number, public email?: string, public phone?: string, public name?: string) {}
}
