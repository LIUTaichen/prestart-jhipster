import { Injectable, OnInit, HostListener } from '@angular/core';
import { IPlant } from '../../shared/model/plant.model';

@Injectable({
    providedIn: 'root'
})
export class PrestartDataService implements OnInit {
    info = 'hello world';
    plant: IPlant;
    readonly selectedPlantLocalStorageKey = 'PrestartDataService.plant';
    constructor() {
        this.ngOnInit();
    }

    ngOnInit() {
        console.log('PrestartDataService on init');
        this.plant = JSON.parse(localStorage.getItem(this.selectedPlantLocalStorageKey), this.dateReviver);
    }
    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        console.log('unload');
        localStorage.setItem(this.selectedPlantLocalStorageKey, JSON.stringify(this.plant));
    }

    setPlant(plant: IPlant) {
        this.plant = plant;
        localStorage.setItem(this.selectedPlantLocalStorageKey, JSON.stringify(this.plant));
    }

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
}
