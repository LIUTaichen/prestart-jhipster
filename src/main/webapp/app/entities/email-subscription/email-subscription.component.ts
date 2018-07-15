import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmailSubscription } from 'app/shared/model/email-subscription.model';
import { Principal } from 'app/core';
import { EmailSubscriptionService } from './email-subscription.service';

@Component({
    selector: 'jhi-email-subscription',
    templateUrl: './email-subscription.component.html'
})
export class EmailSubscriptionComponent implements OnInit, OnDestroy {
    emailSubscriptions: IEmailSubscription[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private emailSubscriptionService: EmailSubscriptionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.emailSubscriptionService.query().subscribe(
            (res: HttpResponse<IEmailSubscription[]>) => {
                this.emailSubscriptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmailSubscriptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmailSubscription) {
        return item.id;
    }

    registerChangeInEmailSubscriptions() {
        this.eventSubscriber = this.eventManager.subscribe('emailSubscriptionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
