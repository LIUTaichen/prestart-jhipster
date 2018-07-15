import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INiggle } from 'app/shared/model/niggle.model';
import { Principal } from 'app/core';
import { NiggleService } from './niggle.service';

@Component({
    selector: 'jhi-niggle',
    templateUrl: './niggle.component.html'
})
export class NiggleComponent implements OnInit, OnDestroy {
    niggles: INiggle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private niggleService: NiggleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.niggleService.query().subscribe(
            (res: HttpResponse<INiggle[]>) => {
                this.niggles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNiggles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INiggle) {
        return item.id;
    }

    registerChangeInNiggles() {
        this.eventSubscriber = this.eventManager.subscribe('niggleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
