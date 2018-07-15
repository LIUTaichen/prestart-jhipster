import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';
import { PrestartCheckQuestionListItemService } from './prestart-check-question-list-item.service';
import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config';
import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionService } from 'app/entities/prestart-question';

@Component({
    selector: 'jhi-prestart-check-question-list-item-update',
    templateUrl: './prestart-check-question-list-item-update.component.html'
})
export class PrestartCheckQuestionListItemUpdateComponent implements OnInit {
    private _prestartCheckQuestionListItem: IPrestartCheckQuestionListItem;
    isSaving: boolean;

    prestartcheckconfigs: IPrestartCheckConfig[];

    prestartquestions: IPrestartQuestion[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private prestartCheckQuestionListItemService: PrestartCheckQuestionListItemService,
        private prestartCheckConfigService: PrestartCheckConfigService,
        private prestartQuestionService: PrestartQuestionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestartCheckQuestionListItem }) => {
            this.prestartCheckQuestionListItem = prestartCheckQuestionListItem;
        });
        this.prestartCheckConfigService.query().subscribe(
            (res: HttpResponse<IPrestartCheckConfig[]>) => {
                this.prestartcheckconfigs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.prestartCheckQuestionListItem.id !== undefined) {
            this.subscribeToSaveResponse(this.prestartCheckQuestionListItemService.update(this.prestartCheckQuestionListItem));
        } else {
            this.subscribeToSaveResponse(this.prestartCheckQuestionListItemService.create(this.prestartCheckQuestionListItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestartCheckQuestionListItem>>) {
        result.subscribe(
            (res: HttpResponse<IPrestartCheckQuestionListItem>) => this.onSaveSuccess(),
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

    trackPrestartCheckConfigById(index: number, item: IPrestartCheckConfig) {
        return item.id;
    }

    trackPrestartQuestionById(index: number, item: IPrestartQuestion) {
        return item.id;
    }
    get prestartCheckQuestionListItem() {
        return this._prestartCheckQuestionListItem;
    }

    set prestartCheckQuestionListItem(prestartCheckQuestionListItem: IPrestartCheckQuestionListItem) {
        this._prestartCheckQuestionListItem = prestartCheckQuestionListItem;
    }
}
