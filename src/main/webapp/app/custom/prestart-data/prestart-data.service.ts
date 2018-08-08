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
import { PlantService } from 'app/entities/plant';
import { RecentPlantsService } from 'app/custom/select-plant/recent-plants/recent-plants.service';

@Injectable({
    providedIn: 'root'
})
export class PrestartDataService implements OnInit {
    data: Data;
    account: Account;
    // prestart: PrestartCheck;
    readonly dataLocalStorageKey = 'PrestartDataService.data';
    constructor(
        private prestartCheckService: PrestartCheckService,
        private router: Router,
        private principal: Principal,
        private plantService: PlantService,
        private recentPlantsService: RecentPlantsService
    ) {
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
        this.recentPlantsService.addRecentPlant(plantLog.plant);
        return this.prestartCheckService.create(prestartCheck);
    }

    setLocation(location: ILocation) {
        this.data.plantLog.location = location;
        localStorage.setItem(this.dataLocalStorageKey, JSON.stringify(this.data));
    }

    initialize() {
        this.setData({
            prestartCheck: new PrestartCheck(),
            plantIdToConfirm: null,
            chosenOptions: null,
            plantLog: new PlantLog()
        });
    }

    setPlantId(id: number) {
        this.data.plantIdToConfirm = id;
    }

    setPlant(plant: IPlant) {
        if (this.data.plantLog && this.data.plantLog.plant === plant) {
            return;
        }
        const data = this.data;
        const plantLog = data.plantLog;
        plantLog.plant = plant;
        plantLog.certificateDueDate = plant.certificateDueDate;
        // plantLog.hubboReading = plant.hubboReading;
        plantLog.lastMaintenanceAt = plant.lastMaintenanceAt;
        plantLog.lastMaintenanceDate = plant.lastMaintenanceDate;
        plantLog.maintenanceDueAt = plant.maintenanceDueAt;
        plantLog.maintenanceDueDate = plant.maintenanceDueDate;
        // plantLog.meterReading = plant.meterReading;
        plantLog.registrationDueDate = plant.registrationDueDate;
        plantLog.rucDueAt = plant.rucDueAtKm;
        data.chosenOptions = null;
        this.setData(data);
    }

    setNotes(notes: string) {
        this.data.plantLog.notes = notes;
        localStorage.setItem(this.dataLocalStorageKey, JSON.stringify(this.data));
    }
}

export interface Data {
    prestartCheck: PrestartCheck;
    plantIdToConfirm: number;
    chosenOptions: Array<PrestartQuestionOption>;
    plantLog: IPlantLog;
}
