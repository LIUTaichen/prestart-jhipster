import { Injectable } from '@angular/core';
import { IPlant } from '../../shared/model/plant.model';

@Injectable({
    providedIn: 'root'
})
export class PrestartDataService {
    info = 'hello world';
    plant: IPlant;
    constructor() {}
}
