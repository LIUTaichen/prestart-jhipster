import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { PrestartQuestionOptionService } from './prestart-question-option.service';
import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionService } from 'app/entities/prestart-question';

@Component({
    selector: 'jhi-prestart-question-option-update',
    templateUrl: './prestart-question-option-update.component.html'
})
export class PrestartQuestionOptionUpdateComponent implements OnInit {
    private _prestartQuestionOption: IPrestartQuestionOption;
    isSaving: boolean;

    prestartquestions: IPrestartQuestion[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private prestartQuestionOptionService: PrestartQuestionOptionService,
        private prestartQuestionService: PrestartQuestionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartQuestionOption }) => {
            this.prestartQuestionOption = prestartQuestionOption;
        });
        this.prestartQuestionService.query().subscribe(
            (res: HttpResponse<IPrestartQuestion[]>) => {
                this.prestartquestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prestartQuestionOption.id !== undefined) {
            this.subscribeToSaveResponse(this.prestartQuestionOptionService.update(this.prestartQuestionOption));
        } else {
            this.subscribeToSaveResponse(this.prestartQuestionOptionService.create(this.prestartQuestionOption));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestartQuestionOption>>) {
        result.subscribe(
            (res: HttpResponse<IPrestartQuestionOption>) => this.onSaveSuccess(),
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

    trackPrestartQuestionById(index: number, item: IPrestartQuestion) {
        return item.id;
    }
    get prestartQuestionOption() {
        return this._prestartQuestionOption;
    }

    set prestartQuestionOption(prestartQuestionOption: IPrestartQuestionOption) {
        this._prestartQuestionOption = prestartQuestionOption;
    }
}
