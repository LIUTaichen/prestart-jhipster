import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';
import { Principal } from 'app/core';
import { PrestartCheckResponseService } from './prestart-check-response.service';

@Component({
    selector: 'jhi-prestart-check-response',
    templateUrl: './prestart-check-response.component.html'
})
export class PrestartCheckResponseComponent implements OnInit, OnDestroy {
    prestartCheckResponses: IPrestartCheckResponse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prestartCheckResponseService: PrestartCheckResponseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.prestartCheckResponseService.query().subscribe(
            (res: HttpResponse<IPrestartCheckResponse[]>) => {
                this.prestartCheckResponses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrestartCheckResponses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrestartCheckResponse) {
        return item.id;
    }

    registerChangeInPrestartCheckResponses() {
        this.eventSubscriber = this.eventManager.subscribe('prestartCheckResponseListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
