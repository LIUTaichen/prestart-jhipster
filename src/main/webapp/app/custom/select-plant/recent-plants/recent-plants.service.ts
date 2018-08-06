import { Injectable } from '@angular/core';
import { IPlant } from '../../../shared/model/plant.model';

@Injectable({
    providedIn: 'root'
})
export class RecentPlantsService {
    readonly dataLocalStorageKey = 'RECENT_PLANTS';
    constructor() {}

    dateReviver(key, value) {
        let a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
            }
        }
        return value;
    }

    getRecentPlants(): IPlant[] {
        return JSON.parse(localStorage.getItem(this.dataLocalStorageKey), this.dateReviver);
    }

    setRecentPlants(plants: IPlant[]) {
        localStorage.setItem(this.dataLocalStorageKey, JSON.stringify(plants));
    }

    addRecentPlant(plant: IPlant) {
        let recentPlants = this.getRecentPlants();
        if (!recentPlants) {
            recentPlants = new Array<IPlant>();
        }
        const updatedRecentPlants = recentPlants.filter(item => item.id !== plant.id);
        updatedRecentPlants.unshift(plant);
        this.setRecentPlants(updatedRecentPlants);
    }
}
