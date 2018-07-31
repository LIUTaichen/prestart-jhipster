import { IPlantAudit } from 'app/shared/model//plant-audit.model';

export interface IImage {
    id?: number;
    description?: string;
    imageContentType?: string;
    image?: any;
    plantAudit?: IPlantAudit;
}

export class Image implements IImage {
    constructor(
        public id?: number,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public plantAudit?: IPlantAudit
    ) {}
}
