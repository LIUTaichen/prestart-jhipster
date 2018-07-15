import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';
import { PrestartCheckResponseService } from './prestart-check-response.service';
import { IPrestartCheck } from 'app/shared/model/prestart-check.model';
import { PrestartCheckService } from 'app/entities/prestart-check';
import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionService } from 'app/entities/prestart-question';
import { IPrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { PrestartQuestionOptionService } from 'app/entities/prestart-question-option';

@Component({
    selector: 'jhi-prestart-check-response-update',
    templateUrl: './prestart-check-response-update.component.html'
})
export class PrestartCheckResponseUpdateComponent implements OnInit {
    private _prestartCheckResponse: IPrestartCheckResponse;
    isSaving: boolean;

    prestartchecks: IPrestartCheck[];

    prestartquestions: IPrestartQuestion[];

    prestartquestionoptions: IPrestartQuestionOption[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private prestartCheckResponseService: PrestartCheckResponseService,
        private prestartCheckService: PrestartCheckService,
        private prestartQuestionService: PrestartQuestionService,
        private prestartQuestionOptionService: PrestartQuestionOptionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartCheckResponse }) => {
            this.prestartCheckResponse = prestartCheckResponse;
        });
        this.prestartCheckService.query().subscribe(
            (res: HttpResponse<IPrestartCheck[]>) => {
                this.prestartchecks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.prestartQuestionService.query().subscribe(
            (res: HttpResponse<IPrestartQuestion[]>) => {
                this.prestartquestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.prestartQuestionOptionService.query().subscribe(
            (res: HttpResponse<IPrestartQuestionOption[]>) => {
                this.prestartquestionoptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prestartCheckResponse.id !== undefined) {
            this.subscribeToSaveResponse(this.prestartCheckResponseService.update(this.prestartCheckResponse));
        } else {
            this.subscribeToSaveResponse(this.prestartCheckResponseService.create(this.prestartCheckResponse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestartCheckResponse>>) {
        result.subscribe(
            (res: HttpResponse<IPrestartCheckResponse>) => this.onSaveSuccess(),
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPrestartCheckById(index: number, item: IPrestartCheck) {
        return item.id;
    }

    trackPrestartQuestionById(index: number, item: IPrestartQuestion) {
        return item.id;
    }

    trackPrestartQuestionOptionById(index: number, item: IPrestartQuestionOption) {
        return item.id;
    }
    get prestartCheckResponse() {
        return this._prestartCheckResponse;
    }

    set prestartCheckResponse(prestartCheckResponse: IPrestartCheckResponse) {
        this._prestartCheckResponse = prestartCheckResponse;
    }
}
