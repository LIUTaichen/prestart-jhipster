import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { Principal } from 'app/core';
import { PrestartQuestionService } from './prestart-question.service';

@Component({
    selector: 'jhi-prestart-question',
    templateUrl: './prestart-question.component.html'
})
export class PrestartQuestionComponent implements OnInit, OnDestroy {
    prestartQuestions: IPrestartQuestion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prestartQuestionService: PrestartQuestionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.prestartQuestionService.query().subscribe(
            (res: HttpResponse<IPrestartQuestion[]>) => {
                this.prestartQuestions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrestartQuestions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrestartQuestion) {
        return item.id;
    }

    registerChangeInPrestartQuestions() {
        this.eventSubscriber = this.eventManager.subscribe('prestartQuestionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
