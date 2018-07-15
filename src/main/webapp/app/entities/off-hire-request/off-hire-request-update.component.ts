import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IOffHireRequest } from 'app/shared/model/off-hire-request.model';
import { OffHireRequestService } from './off-hire-request.service';

@Component({
    selector: 'jhi-off-hire-request-update',
    templateUrl: './off-hire-request-update.component.html'
})
export class OffHireRequestUpdateComponent implements OnInit {
    private _offHireRequest: IOffHireRequest;
    isSaving: boolean;

    constructor(private offHireRequestService: OffHireRequestService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ offHireRequest }) => {
            this.offHireRequest = offHireRequest;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.offHireRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.offHireRequestService.update(this.offHireRequest));
        } else {
            this.subscribeToSaveResponse(this.offHireRequestService.create(this.offHireRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOffHireRequest>>) {
        result.subscribe((res: HttpResponse<IOffHireRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get offHireRequest() {
        return this._offHireRequest;
    }

    set offHireRequest(offHireRequest: IOffHireRequest) {
        this._offHireRequest = offHireRequest;
    }
}
