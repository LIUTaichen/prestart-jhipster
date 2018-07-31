import { IPrestartCheckConfig } from 'app/shared/model//prestart-check-config.model';
import { IPrestartQuestionOption } from 'app/shared/model//prestart-question-option.model';

export interface IPrestartQuestion {
    id?: number;
    body?: string;
    isLockOutRequired?: boolean;
    order?: number;
    prestartCheckConfig?: IPrestartCheckConfig;
    options?: IPrestartQuestionOption[];
}

export class PrestartQuestion implements IPrestartQuestion {
    constructor(
        public id?: number,
        public body?: string,
        public isLockOutRequired?: boolean,
        public order?: number,
        public prestartCheckConfig?: IPrestartCheckConfig,
        public options?: IPrestartQuestionOption[]
    ) {
        this.isLockOutRequired = false;
    }
}
