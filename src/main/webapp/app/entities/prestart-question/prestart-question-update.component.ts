import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionService } from './prestart-question.service';

@Component({
    selector: 'jhi-prestart-question-update',
    templateUrl: './prestart-question-update.component.html'
})
export class PrestartQuestionUpdateComponent implements OnInit {
    private _prestartQuestion: IPrestartQuestion;
    isSaving: boolean;

    constructor(private prestartQuestionService: PrestartQuestionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartQuestion }) => {
            this.prestartQuestion = prestartQuestion;
        });
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
    get prestartQuestion() {
        return this._prestartQuestion;
    }

    set prestartQuestion(prestartQuestion: IPrestartQuestion) {
        this._prestartQuestion = prestartQuestion;
    }
}
