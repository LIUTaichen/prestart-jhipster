import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPrestartCheck } from 'app/shared/model/prestart-check.model';
import { PrestartCheckService } from './prestart-check.service';
import { IPlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from 'app/entities/plant-log';

@Component({
    selector: 'jhi-prestart-check-update',
    templateUrl: './prestart-check-update.component.html'
})
export class PrestartCheckUpdateComponent implements OnInit {
    private _prestartCheck: IPrestartCheck;
    isSaving: boolean;

    plantlogs: IPlantLog[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private prestartCheckService: PrestartCheckService,
        private plantLogService: PlantLogService,
        private elementRef: ElementRef,
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

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.prestartCheck, this.elementRef, field, fieldContentType, idInput);
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
    get prestartCheck() {
        return this._prestartCheck;
    }

    set prestartCheck(prestartCheck: IPrestartCheck) {
        this._prestartCheck = prestartCheck;
    }
}
