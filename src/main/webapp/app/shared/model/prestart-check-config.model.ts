import { IPrestartCheckQuestionListItem } from 'app/shared/model//prestart-check-question-list-item.model';

export interface IPrestartCheckConfig {
    id?: number;
    name?: string;
    questionlists?: IPrestartCheckQuestionListItem[];
}

export class PrestartCheckConfig implements IPrestartCheckConfig {
    constructor(public id?: number, public name?: string, public questionlists?: IPrestartCheckQuestionListItem[]) {}
}
