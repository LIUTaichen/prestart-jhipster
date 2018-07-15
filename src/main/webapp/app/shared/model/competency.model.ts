export interface ICompetency {
    id?: number;
    competency?: string;
    grouping?: string;
    sortOrder?: number;
}

export class Competency implements ICompetency {
    constructor(public id?: number, public competency?: string, public grouping?: string, public sortOrder?: number) {}
}
