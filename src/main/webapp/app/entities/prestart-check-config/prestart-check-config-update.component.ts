import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { PrestartCheckConfigService } from './prestart-check-config.service';

@Component({
    selector: 'jhi-prestart-check-config-update',
    templateUrl: './prestart-check-config-update.component.html'
})
export class PrestartCheckConfigUpdateComponent implements OnInit {
    private _prestartCheckConfig: IPrestartCheckConfig;
    isSaving: boolean;

    constructor(private prestartCheckConfigService: PrestartCheckConfigService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartCheckConfig }) => {
            this.prestartCheckConfig = prestartCheckConfig;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prestartCheckConfig.id !== undefined) {
            this.subscribeToSaveResponse(this.prestartCheckConfigService.update(this.prestartCheckConfig));
        } else {
            this.subscribeToSaveResponse(this.prestartCheckConfigService.create(this.prestartCheckConfig));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestartCheckConfig>>) {
        result.subscribe((res: HttpResponse<IPrestartCheckConfig>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get prestartCheckConfig() {
        return this._prestartCheckConfig;
    }

    set prestartCheckConfig(prestartCheckConfig: IPrestartCheckConfig) {
        this._prestartCheckConfig = prestartCheckConfig;
    }
}
