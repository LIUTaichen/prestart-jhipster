import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';
import { Principal } from 'app/core';
import { NiggleSnapshotService } from './niggle-snapshot.service';

@Component({
    selector: 'jhi-niggle-snapshot',
    templateUrl: './niggle-snapshot.component.html'
})
export class NiggleSnapshotComponent implements OnInit, OnDestroy {
    niggleSnapshots: INiggleSnapshot[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private niggleSnapshotService: NiggleSnapshotService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.niggleSnapshotService.query().subscribe(
            (res: HttpResponse<INiggleSnapshot[]>) => {
                this.niggleSnapshots = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNiggleSnapshots();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INiggleSnapshot) {
        return item.id;
    }

    registerChangeInNiggleSnapshots() {
        this.eventSubscriber = this.eventManager.subscribe('niggleSnapshotListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
