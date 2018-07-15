import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { Principal } from 'app/core';
import { PrestartQuestionOptionService } from './prestart-question-option.service';

@Component({
    selector: 'jhi-prestart-question-option',
    templateUrl: './prestart-question-option.component.html'
})
export class PrestartQuestionOptionComponent implements OnInit, OnDestroy {
    prestartQuestionOptions: IPrestartQuestionOption[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prestartQuestionOptionService: PrestartQuestionOptionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.prestartQuestionOptionService.query().subscribe(
            (res: HttpResponse<IPrestartQuestionOption[]>) => {
                this.prestartQuestionOptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrestartQuestionOptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrestartQuestionOption) {
        return item.id;
    }

    registerChangeInPrestartQuestionOptions() {
        this.eventSubscriber = this.eventManager.subscribe('prestartQuestionOptionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
