import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEmailSubscription } from 'app/shared/model/email-subscription.model';
import { EmailSubscriptionService } from './email-subscription.service';

@Component({
    selector: 'jhi-email-subscription-update',
    templateUrl: './email-subscription-update.component.html'
})
export class EmailSubscriptionUpdateComponent implements OnInit {
    private _emailSubscription: IEmailSubscription;
    isSaving: boolean;

    constructor(private emailSubscriptionService: EmailSubscriptionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ emailSubscription }) => {
            this.emailSubscription = emailSubscription;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.emailSubscription.id !== undefined) {
            this.subscribeToSaveResponse(this.emailSubscriptionService.update(this.emailSubscription));
        } else {
            this.subscribeToSaveResponse(this.emailSubscriptionService.create(this.emailSubscription));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmailSubscription>>) {
        result.subscribe((res: HttpResponse<IEmailSubscription>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get emailSubscription() {
        return this._emailSubscription;
    }

    set emailSubscription(emailSubscription: IEmailSubscription) {
        this._emailSubscription = emailSubscription;
    }
}
