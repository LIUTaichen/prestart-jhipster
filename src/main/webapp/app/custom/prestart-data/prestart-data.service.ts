import { Injectable, OnInit, HostListener } from '@angular/core';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { PrestartCheck, IPrestartCheck } from 'app/shared/model/prestart-check.model';
import { ILocation, Location } from 'app/shared/model//location.model';
import { PlantLog, IPlantLog } from 'app/shared/model/plant-log.model';
import { PrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';
import { PrestartCheckService } from 'app/entities/prestart-check';
import { Principal, Account } from 'app/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PrestartDataService implements OnInit {
    data: Data;
    account: Account;
    // prestart: PrestartCheck;
    readonly dataLocalStorageKey = 'PrestartDataService.data';
    constructor(private prestartCheckService: PrestartCheckService, private router: Router, private principal: Principal) {
        this.ngOnInit();
    }

    ngOnInit() {
        console.log('PrestartDataService on init');
        this.data = JSON.parse(localStorage.getItem(this.dataLocalStorageKey), this.dateReviver);
        if (!this.data) {
            this.initialize();
        }
        this.principal.identity().then(identity => {
            console.log('identity obtained');
            this.account = identity;
        });
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

    setSignature(imageType: string, image: string) {
        this.data.prestartCheck.signatureContentType = imageType;
        this.data.prestartCheck.signature = image;
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

    save(): Observable<HttpResponse<IPrestartCheck>> {
        const prestartCheck: PrestartCheck = this.data.prestartCheck;
        const plantLog = this.data.plantLog;
        plantLog.plant = this.data.plant;
        plantLog.meterReading = this.data.meterReading;
        plantLog.hubboReading = this.data.hubboReading;
        plantLog.operatorName = this.account.firstName + ' ' + this.account.lastName;
        prestartCheck.plantLog = plantLog;
        prestartCheck.responses = new Array<PrestartCheckResponse>();
        this.data.chosenOptions.map(option => {
            const responseItem = new PrestartCheckResponse();
            responseItem.question = option.prestartQuestion;
            responseItem.response = option;
            prestartCheck.responses.push(responseItem);
        });
        console.log(prestartCheck);
        return this.prestartCheckService.create(prestartCheck);
    }

    setLocation(location: ILocation) {
        this.data.plantLog.location = location;
        localStorage.setItem(this.dataLocalStorageKey, JSON.stringify(this.data));
    }

    initialize() {
        this.setData({
            prestartCheck: new PrestartCheck(),
            plant: null,
            chosenOptions: null,
            meterReading: null,
            hubboReading: null,
            plantLog: new PlantLog()
        });
    }
}

export interface Data {
    prestartCheck: PrestartCheck;
    plant: IPlant;
    chosenOptions: Array<PrestartQuestionOption>;
    meterReading: number;
    hubboReading: number;
    plantLog: IPlantLog;
}
