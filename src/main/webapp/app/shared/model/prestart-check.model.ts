import { IPlantLog } from 'app/shared/model//plant-log.model';
import { IPrestartCheckResponse } from 'app/shared/model//prestart-check-response.model';

export interface IPrestartCheck {
    id?: number;
    signatureContentType?: string;
    signature?: any;
    notes?: string;
    plantLog?: IPlantLog;
    responses?: IPrestartCheckResponse[];
}

export class PrestartCheck implements IPrestartCheck {
    constructor(
        public id?: number,
        public signatureContentType?: string,
        public signature?: any,
        public notes?: string,
        public plantLog?: IPlantLog,
        public responses?: IPrestartCheckResponse[]
    ) {}
}
