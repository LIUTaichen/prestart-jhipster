export interface ICompany {
    id?: number;
    company?: string;
    phone?: string;
    address?: string;
    location?: string;
    webPage?: string;
    notes?: string;
    isActive?: boolean;
    abbreviation?: string;
}

export class Company implements ICompany {
    constructor(
        public id?: number,
        public company?: string,
        public phone?: string,
        public address?: string,
        public location?: string,
        public webPage?: string,
        public notes?: string,
        public isActive?: boolean,
        public abbreviation?: string
    ) {
        this.isActive = false;
    }
}
