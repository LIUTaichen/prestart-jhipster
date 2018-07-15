import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOffHireRequest } from 'app/shared/model/off-hire-request.model';
import { Principal } from 'app/core';
import { OffHireRequestService } from './off-hire-request.service';

@Component({
    selector: 'jhi-off-hire-request',
    templateUrl: './off-hire-request.component.html'
})
export class OffHireRequestComponent implements OnInit, OnDestroy {
    offHireRequests: IOffHireRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private offHireRequestService: OffHireRequestService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.offHireRequestService.query().subscribe(
            (res: HttpResponse<IOffHireRequest[]>) => {
                this.offHireRequests = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOffHireRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOffHireRequest) {
        return item.id;
    }

    registerChangeInOffHireRequests() {
        this.eventSubscriber = this.eventManager.subscribe('offHireRequestListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
