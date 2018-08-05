import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from './plant-log.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { IPlant } from 'app/shared/model/plant.model';
import { PlantService } from 'app/entities/plant';

@Component({
    selector: 'jhi-plant-log-update',
    templateUrl: './plant-log-update.component.html'
})
export class PlantLogUpdateComponent implements OnInit {
    private _plantLog: IPlantLog;
    isSaving: boolean;

    locations: ILocation[];

    plants: IPlant[];
    certificateDueDate: string;
    maintenanceDueDate: string;
    registrationDueDate: string;
    lastMaintenanceDate: string;
    lastMaintenanceAt: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private plantLogService: PlantLogService,
        private locationService: LocationService,
        private plantService: PlantService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plantLog }) => {
            this.plantLog = plantLog;
        });
        this.locationService.query({ filter: 'plantlog-is-null' }).subscribe(
            (res: HttpResponse<ILocation[]>) => {
                if (!this.plantLog.location || !this.plantLog.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.plantLog.location.id).subscribe(
                        (subRes: HttpResponse<ILocation>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.plantService.query().subscribe(
            (res: HttpResponse<IPlant[]>) => {
                this.plants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.plantLog.certificateDueDate = moment(this.certificateDueDate, DATE_TIME_FORMAT);
        this.plantLog.maintenanceDueDate = moment(this.maintenanceDueDate, DATE_TIME_FORMAT);
        this.plantLog.registrationDueDate = moment(this.registrationDueDate, DATE_TIME_FORMAT);
        this.plantLog.lastMaintenanceDate = moment(this.lastMaintenanceDate, DATE_TIME_FORMAT);
        this.plantLog.lastMaintenanceAt = moment(this.lastMaintenanceAt, DATE_TIME_FORMAT);
        if (this.plantLog.id !== undefined) {
            this.subscribeToSaveResponse(this.plantLogService.update(this.plantLog));
        } else {
            this.subscribeToSaveResponse(this.plantLogService.create(this.plantLog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlantLog>>) {
        result.subscribe((res: HttpResponse<IPlantLog>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }

    trackPlantById(index: number, item: IPlant) {
        return item.id;
    }
    get plantLog() {
        return this._plantLog;
    }

    set plantLog(plantLog: IPlantLog) {
        this._plantLog = plantLog;
        this.certificateDueDate = moment(plantLog.certificateDueDate).format(DATE_TIME_FORMAT);
        this.maintenanceDueDate = moment(plantLog.maintenanceDueDate).format(DATE_TIME_FORMAT);
        this.registrationDueDate = moment(plantLog.registrationDueDate).format(DATE_TIME_FORMAT);
        this.lastMaintenanceDate = moment(plantLog.lastMaintenanceDate).format(DATE_TIME_FORMAT);
        this.lastMaintenanceAt = moment(plantLog.lastMaintenanceAt).format(DATE_TIME_FORMAT);
    }
}
