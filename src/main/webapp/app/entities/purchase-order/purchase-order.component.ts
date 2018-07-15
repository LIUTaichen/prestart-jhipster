import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { Principal } from 'app/core';
import { PurchaseOrderService } from './purchase-order.service';

@Component({
    selector: 'jhi-purchase-order',
    templateUrl: './purchase-order.component.html'
})
export class PurchaseOrderComponent implements OnInit, OnDestroy {
    purchaseOrders: IPurchaseOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private purchaseOrderService: PurchaseOrderService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.purchaseOrderService.query().subscribe(
            (res: HttpResponse<IPurchaseOrder[]>) => {
                this.purchaseOrders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPurchaseOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPurchaseOrder) {
        return item.id;
    }

    registerChangeInPurchaseOrders() {
        this.eventSubscriber = this.eventManager.subscribe('purchaseOrderListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
