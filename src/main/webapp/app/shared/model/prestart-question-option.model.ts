import { IPrestartQuestion } from 'app/shared/model//prestart-question.model';

export interface IPrestartQuestionOption {
    id?: number;
    body?: string;
    isNormal?: boolean;
    isActive?: boolean;
    question?: IPrestartQuestion;
}

export class PrestartQuestionOption implements IPrestartQuestionOption {
    constructor(
        public id?: number,
        public body?: string,
        public isNormal?: boolean,
        public isActive?: boolean,
        public question?: IPrestartQuestion
    ) {
        this.isNormal = false;
        this.isActive = false;
    }
}
