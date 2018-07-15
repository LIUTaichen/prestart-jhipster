import { Moment } from 'moment';
import { IProject } from 'app/shared/model//project.model';

export interface ILocation {
    id?: number;
    latitude?: number;
    longitude?: number;
    address?: string;
    bearing?: number;
    direction?: string;
    speed?: number;
    timestamp?: Moment;
    provider?: string;
    project?: IProject;
}

export class Location implements ILocation {
    constructor(
        public id?: number,
        public latitude?: number,
        public longitude?: number,
        public address?: string,
        public bearing?: number,
        public direction?: string,
        public speed?: number,
        public timestamp?: Moment,
        public provider?: string,
        public project?: IProject
    ) {}
}
