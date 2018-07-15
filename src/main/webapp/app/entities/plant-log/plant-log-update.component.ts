import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from './plant-log.service';
import { IPlant } from 'app/shared/model/plant.model';
import { PlantService } from 'app/entities/plant';
import { IPeople } from 'app/shared/model/people.model';
import { PeopleService } from 'app/entities/people';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-plant-log-update',
    templateUrl: './plant-log-update.component.html'
})
export class PlantLogUpdateComponent implements OnInit {
    private _plantLog: IPlantLog;
    isSaving: boolean;

    plants: IPlant[];

    people: IPeople[];

    projects: IProject[];
    wofDueDate: string;
    cofDueDate: string;
    serviceDueDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private plantLogService: PlantLogService,
        private plantService: PlantService,
        private peopleService: PeopleService,
        private projectService: ProjectService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plantLog }) => {
            this.plantLog = plantLog;
        });
        this.plantService.query().subscribe(
            (res: HttpResponse<IPlant[]>) => {
                this.plants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.peopleService.query().subscribe(
            (res: HttpResponse<IPeople[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectService.query().subscribe(
            (res: HttpResponse<IProject[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.plantLog.wofDueDate = moment(this.wofDueDate, DATE_TIME_FORMAT);
        this.plantLog.cofDueDate = moment(this.cofDueDate, DATE_TIME_FORMAT);
        this.plantLog.serviceDueDate = moment(this.serviceDueDate, DATE_TIME_FORMAT);
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

    trackPlantById(index: number, item: IPlant) {
        return item.id;
    }

    trackPeopleById(index: number, item: IPeople) {
        return item.id;
    }

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }
    get plantLog() {
        return this._plantLog;
    }

    set plantLog(plantLog: IPlantLog) {
        this._plantLog = plantLog;
        this.wofDueDate = moment(plantLog.wofDueDate).format(DATE_TIME_FORMAT);
        this.cofDueDate = moment(plantLog.cofDueDate).format(DATE_TIME_FORMAT);
        this.serviceDueDate = moment(plantLog.serviceDueDate).format(DATE_TIME_FORMAT);
    }
}
