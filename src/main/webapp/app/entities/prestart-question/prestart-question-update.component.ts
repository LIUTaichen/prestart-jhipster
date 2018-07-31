import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionService } from './prestart-question.service';
import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config';

@Component({
    selector: 'jhi-prestart-question-update',
    templateUrl: './prestart-question-update.component.html'
})
export class PrestartQuestionUpdateComponent implements OnInit {
    private _prestartQuestion: IPrestartQuestion;
    isSaving: boolean;

    prestartcheckconfigs: IPrestartCheckConfig[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private prestartQuestionService: PrestartQuestionService,
        private prestartCheckConfigService: PrestartCheckConfigService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartQuestion }) => {
            this.prestartQuestion = prestartQuestion;
        });
        this.prestartCheckConfigService.query().subscribe(
            (res: HttpResponse<IPrestartCheckConfig[]>) => {
                this.prestartcheckconfigs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.prestartQuestion.id !== undefined) {
            this.subscribeToSaveResponse(this.prestartQuestionService.update(this.prestartQuestion));
        } else {
            this.subscribeToSaveResponse(this.prestartQuestionService.create(this.prestartQuestion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestartQuestion>>) {
        result.subscribe((res: HttpResponse<IPrestartQuestion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPrestartCheckConfigById(index: number, item: IPrestartCheckConfig) {
        return item.id;
    }
    get prestartQuestion() {
        return this._prestartQuestion;
    }

    set prestartQuestion(prestartQuestion: IPrestartQuestion) {
        this._prestartQuestion = prestartQuestion;
    }
}
