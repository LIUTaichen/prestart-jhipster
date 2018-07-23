import { Injectable, OnInit, HostListener } from '@angular/core';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

@Injectable({
    providedIn: 'root'
})
export class PrestartDataService implements OnInit {
    data: Data;
    readonly dataLocalStorageKey = 'PrestartDataService.data';
    constructor() {
        this.ngOnInit();
    }

    ngOnInit() {
        console.log('PrestartDataService on init');
        this.data = JSON.parse(localStorage.getItem(this.dataLocalStorageKey), this.dateReviver);
        if (!this.data) {
            this.data = {
                plant: null,
                chosenOptions: null,
                meterReading: null,
                hubboReading: null
            };
        }
    }
    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        console.log('unload');
        localStorage.setItem(this.dataLocalStorageKey, JSON.stringify(this.data));
    }

    setData(data: Data) {
        this.data = data;
        console.log(this.data);
        localStorage.setItem(this.dataLocalStorageKey, JSON.stringify(this.data));
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

export interface Data {
    plant: IPlant;
    chosenOptions: Array<PrestartQuestionOption>;
    meterReading: number;
    hubboReading: number;
}
