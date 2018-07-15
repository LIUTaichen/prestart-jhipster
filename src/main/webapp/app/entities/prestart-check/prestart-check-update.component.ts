import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPrestartCheck } from 'app/shared/model/prestart-check.model';
import { PrestartCheckService } from './prestart-check.service';
import { IPlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from 'app/entities/plant-log';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';
import { IPlant } from 'app/shared/model/plant.model';
import { PlantService } from 'app/entities/plant';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { IPeople } from 'app/shared/model/people.model';
import { PeopleService } from 'app/entities/people';

@Component({
    selector: 'jhi-prestart-check-update',
    templateUrl: './prestart-check-update.component.html'
})
export class PrestartCheckUpdateComponent implements OnInit {
    private _prestartCheck: IPrestartCheck;
    isSaving: boolean;

    plantlogs: IPlantLog[];

    projects: IProject[];

    plants: IPlant[];

    locations: ILocation[];

    people: IPeople[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private prestartCheckService: PrestartCheckService,
        private plantLogService: PlantLogService,
        private projectService: ProjectService,
        private plantService: PlantService,
        private locationService: LocationService,
        private peopleService: PeopleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartCheck }) => {
            this.prestartCheck = prestartCheck;
        });
        this.plantLogService.query({ filter: 'prestartcheck-is-null' }).subscribe(
            (res: HttpResponse<IPlantLog[]>) => {
                if (!this.prestartCheck.plantLog || !this.prestartCheck.plantLog.id) {
                    this.plantlogs = res.body;
                } else {
                    this.plantLogService.find(this.prestartCheck.plantLog.id).subscribe(
                        (subRes: HttpResponse<IPlantLog>) => {
                            this.plantlogs = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectService.query().subscribe(
            (res: HttpResponse<IProject[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.plantService.query().subscribe(
            (res: HttpResponse<IPlant[]>) => {
                this.plants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.locationService.query().subscribe(
            (res: HttpResponse<ILocation[]>) => {
                this.locations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.peopleService.query().subscribe(
            (res: HttpResponse<IPeople[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prestartCheck.id !== undefined) {
            this.subscribeToSaveResponse(this.prestartCheckService.update(this.prestartCheck));
        } else {
            this.subscribeToSaveResponse(this.prestartCheckService.create(this.prestartCheck));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestartCheck>>) {
        result.subscribe((res: HttpResponse<IPrestartCheck>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPlantLogById(index: number, item: IPlantLog) {
        return item.id;
    }

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }

    trackPlantById(index: number, item: IPlant) {
        return item.id;
    }

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }

    trackPeopleById(index: number, item: IPeople) {
        return item.id;
    }
    get prestartCheck() {
        return this._prestartCheck;
    }

    set prestartCheck(prestartCheck: IPrestartCheck) {
        this._prestartCheck = prestartCheck;
    }
}
