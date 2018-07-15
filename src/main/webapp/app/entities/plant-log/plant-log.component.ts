import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlantLog } from 'app/shared/model/plant-log.model';
import { Principal } from 'app/core';
import { PlantLogService } from './plant-log.service';

@Component({
    selector: 'jhi-plant-log',
    templateUrl: './plant-log.component.html'
})
export class PlantLogComponent implements OnInit, OnDestroy {
    plantLogs: IPlantLog[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private plantLogService: PlantLogService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.plantLogService.query().subscribe(
            (res: HttpResponse<IPlantLog[]>) => {
                this.plantLogs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlantLogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlantLog) {
        return item.id;
    }

    registerChangeInPlantLogs() {
        this.eventSubscriber = this.eventManager.subscribe('plantLogListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
