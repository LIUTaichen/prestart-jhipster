import { IPrestartQuestion } from 'app/shared/model//prestart-question.model';

export interface IPrestartCheckConfig {
    id?: number;
    name?: string;
    notes?: string;
    questionlists?: IPrestartQuestion[];
}

export class PrestartCheckConfig implements IPrestartCheckConfig {
    constructor(public id?: number, public name?: string, public notes?: string, public questionlists?: IPrestartQuestion[]) {}
}
