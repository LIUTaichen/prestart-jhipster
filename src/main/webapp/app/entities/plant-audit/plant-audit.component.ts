import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlantAudit } from 'app/shared/model/plant-audit.model';
import { Principal } from 'app/core';
import { PlantAuditService } from './plant-audit.service';

@Component({
    selector: 'jhi-plant-audit',
    templateUrl: './plant-audit.component.html'
})
export class PlantAuditComponent implements OnInit, OnDestroy {
    plantAudits: IPlantAudit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private plantAuditService: PlantAuditService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.plantAuditService.query().subscribe(
            (res: HttpResponse<IPlantAudit[]>) => {
                this.plantAudits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPlantAudits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPlantAudit) {
        return item.id;
    }

    registerChangeInPlantAudits() {
        this.eventSubscriber = this.eventManager.subscribe('plantAuditListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
