import { IPrestartCheck } from 'app/shared/model//prestart-check.model';
import { IPrestartQuestion } from 'app/shared/model//prestart-question.model';
import { IPrestartQuestionOption } from 'app/shared/model//prestart-question-option.model';

export interface IPrestartCheckResponse {
    id?: number;
    prestartCheck?: IPrestartCheck;
    question?: IPrestartQuestion;
    response?: IPrestartQuestionOption;
}

export class PrestartCheckResponse implements IPrestartCheckResponse {
    constructor(
        public id?: number,
        public prestartCheck?: IPrestartCheck,
        public question?: IPrestartQuestion,
        public response?: IPrestartQuestionOption
    ) {}
}
