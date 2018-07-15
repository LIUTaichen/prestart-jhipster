import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';
import { MaintenanceContractorService } from './maintenance-contractor.service';

@Component({
    selector: 'jhi-maintenance-contractor-update',
    templateUrl: './maintenance-contractor-update.component.html'
})
export class MaintenanceContractorUpdateComponent implements OnInit {
    private _maintenanceContractor: IMaintenanceContractor;
    isSaving: boolean;

    constructor(private maintenanceContractorService: MaintenanceContractorService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ maintenanceContractor }) => {
            this.maintenanceContractor = maintenanceContractor;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.maintenanceContractor.id !== undefined) {
            this.subscribeToSaveResponse(this.maintenanceContractorService.update(this.maintenanceContractor));
        } else {
            this.subscribeToSaveResponse(this.maintenanceContractorService.create(this.maintenanceContractor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMaintenanceContractor>>) {
        result.subscribe(
            (res: HttpResponse<IMaintenanceContractor>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get maintenanceContractor() {
        return this._maintenanceContractor;
    }

    set maintenanceContractor(maintenanceContractor: IMaintenanceContractor) {
        this._maintenanceContractor = maintenanceContractor;
    }
}
