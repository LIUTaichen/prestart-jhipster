import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { Principal } from 'app/core';
import { PrestartCheckConfigService } from './prestart-check-config.service';

@Component({
    selector: 'jhi-prestart-check-config',
    templateUrl: './prestart-check-config.component.html'
})
export class PrestartCheckConfigComponent implements OnInit, OnDestroy {
    prestartCheckConfigs: IPrestartCheckConfig[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private prestartCheckConfigService: PrestartCheckConfigService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.prestartCheckConfigService.query().subscribe(
            (res: HttpResponse<IPrestartCheckConfig[]>) => {
                this.prestartCheckConfigs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrestartCheckConfigs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrestartCheckConfig) {
        return item.id;
    }

    registerChangeInPrestartCheckConfigs() {
        this.eventSubscriber = this.eventManager.subscribe('prestartCheckConfigListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
