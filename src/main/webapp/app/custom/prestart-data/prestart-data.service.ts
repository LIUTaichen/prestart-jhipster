import { Injectable, OnInit, HostListener } from '@angular/core';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { PrestartCheck } from 'app/shared/model/prestart-check.model';
import { ILocation, Location } from 'app/shared/model//location.model';
import { PlantLog } from 'app/shared/model/plant-log.model';
import { PrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';
import { PrestartCheckService } from 'app/entities/prestart-check';

@Injectable({
    providedIn: 'root'
})
export class PrestartDataService implements OnInit {
    data: Data;
    readonly dataLocalStorageKey = 'PrestartDataService.data';
    constructor(private prestartCheckService: PrestartCheckService) {
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

    save() {
        const prestartCheck: PrestartCheck = new PrestartCheck();
        // prestartCheck.location = new Location();
        prestartCheck.plantLog = new PlantLog();
        prestartCheck.plantLog.plant = this.data.plant;
        prestartCheck.plantLog.meterReading = this.data.meterReading;
        prestartCheck.plantLog.hubboReading = this.data.hubboReading;
        prestartCheck.responses = new Array<PrestartCheckResponse>();
        this.data.chosenOptions.map(option => {
            const responseItem = new PrestartCheckResponse();
            responseItem.question = option.prestartQuestion;
            responseItem.question.options = null;
            responseItem.response = option;
            responseItem.response.prestartQuestion = null;
            // responseItem.prestartCheck = prestartCheck;
            // responseItem.prestartCheck.id = prestartCheck.id;
            prestartCheck.responses.push(responseItem);
        });
        console.log(prestartCheck);
        this.prestartCheckService.create(prestartCheck).subscribe(response => {
            console.log(response);
        });
    }
}

export interface Data {
    plant: IPlant;
    chosenOptions: Array<PrestartQuestionOption>;
    meterReading: number;
    hubboReading: number;
}
