import { IPrestartCheckConfig } from 'app/shared/model//prestart-check-config.model';
import { IPrestartQuestion } from 'app/shared/model//prestart-question.model';

export interface IPrestartCheckQuestionListItem {
    id?: number;
    order?: number;
    prestartCheckConfig?: IPrestartCheckConfig;
    question?: IPrestartQuestion;
}

export class PrestartCheckQuestionListItem implements IPrestartCheckQuestionListItem {
    constructor(
        public id?: number,
        public order?: number,
        public prestartCheckConfig?: IPrestartCheckConfig,
        public question?: IPrestartQuestion
    ) {}
}
