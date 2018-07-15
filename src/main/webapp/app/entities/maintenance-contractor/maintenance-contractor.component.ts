import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';
import { Principal } from 'app/core';
import { MaintenanceContractorService } from './maintenance-contractor.service';

@Component({
    selector: 'jhi-maintenance-contractor',
    templateUrl: './maintenance-contractor.component.html'
})
export class MaintenanceContractorComponent implements OnInit, OnDestroy {
    maintenanceContractors: IMaintenanceContractor[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private maintenanceContractorService: MaintenanceContractorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.maintenanceContractorService.query().subscribe(
            (res: HttpResponse<IMaintenanceContractor[]>) => {
                this.maintenanceContractors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMaintenanceContractors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMaintenanceContractor) {
        return item.id;
    }

    registerChangeInMaintenanceContractors() {
        this.eventSubscriber = this.eventManager.subscribe('maintenanceContractorListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
