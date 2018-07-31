import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPlantAudit } from 'app/shared/model/plant-audit.model';
import { PlantAuditService } from './plant-audit.service';
import { IPlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from 'app/entities/plant-log';

@Component({
    selector: 'jhi-plant-audit-update',
    templateUrl: './plant-audit-update.component.html'
})
export class PlantAuditUpdateComponent implements OnInit {
    private _plantAudit: IPlantAudit;
    isSaving: boolean;

    plantlogs: IPlantLog[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private plantAuditService: PlantAuditService,
        private plantLogService: PlantLogService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plantAudit }) => {
            this.plantAudit = plantAudit;
        });
        this.plantLogService.query({ filter: 'plantaudit-is-null' }).subscribe(
            (res: HttpResponse<IPlantLog[]>) => {
                if (!this.plantAudit.plantLog || !this.plantAudit.plantLog.id) {
                    this.plantlogs = res.body;
                } else {
                    this.plantLogService.find(this.plantAudit.plantLog.id).subscribe(
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.plantAudit.id !== undefined) {
            this.subscribeToSaveResponse(this.plantAuditService.update(this.plantAudit));
        } else {
            this.subscribeToSaveResponse(this.plantAuditService.create(this.plantAudit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlantAudit>>) {
        result.subscribe((res: HttpResponse<IPlantAudit>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get plantAudit() {
        return this._plantAudit;
    }

    set plantAudit(plantAudit: IPlantAudit) {
        this._plantAudit = plantAudit;
    }
}
