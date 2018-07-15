import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmailSubscription } from 'app/shared/model/email-subscription.model';

@Component({
    selector: 'jhi-email-subscription-detail',
    templateUrl: './email-subscription-detail.component.html'
})
export class EmailSubscriptionDetailComponent implements OnInit {
    emailSubscription: IEmailSubscription;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emailSubscription }) => {
            this.emailSubscription = emailSubscription;
        });
    }

    previousState() {
        window.history.back();
    }
}
