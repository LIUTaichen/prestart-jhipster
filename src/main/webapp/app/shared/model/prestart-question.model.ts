import { IPrestartQuestionOption } from 'app/shared/model//prestart-question-option.model';

export interface IPrestartQuestion {
    id?: number;
    body?: string;
    isLockOutRequired?: boolean;
    options?: IPrestartQuestionOption[];
}

export class PrestartQuestion implements IPrestartQuestion {
    constructor(public id?: number, public body?: string, public isLockOutRequired?: boolean, public options?: IPrestartQuestionOption[]) {
        this.isLockOutRequired = false;
    }
}
