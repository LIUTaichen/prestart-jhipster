import { IPlantLog } from 'app/shared/model//plant-log.model';
import { IPrestartCheckResponse } from 'app/shared/model//prestart-check-response.model';
import { IProject } from 'app/shared/model//project.model';
import { IPlant } from 'app/shared/model//plant.model';
import { ILocation } from 'app/shared/model//location.model';
import { IPeople } from 'app/shared/model//people.model';

export interface IPrestartCheck {
    id?: number;
    signatureContentType?: string;
    signature?: any;
    plantLog?: IPlantLog;
    responses?: IPrestartCheckResponse[];
    project?: IProject;
    plant?: IPlant;
    location?: ILocation;
    operator?: IPeople;
}

export class PrestartCheck implements IPrestartCheck {
    constructor(
        public id?: number,
        public signatureContentType?: string,
        public signature?: any,
        public plantLog?: IPlantLog,
        public responses?: IPrestartCheckResponse[],
        public project?: IProject,
        public plant?: IPlant,
        public location?: ILocation,
        public operator?: IPeople
    ) {}
}
