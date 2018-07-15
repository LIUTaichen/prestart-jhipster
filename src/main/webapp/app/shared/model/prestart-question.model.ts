export interface IPrestartQuestion {
    id?: number;
    body?: string;
    isLockOutRequired?: boolean;
}

export class PrestartQuestion implements IPrestartQuestion {
    constructor(public id?: number, public body?: string, public isLockOutRequired?: boolean) {
        this.isLockOutRequired = false;
    }
}
