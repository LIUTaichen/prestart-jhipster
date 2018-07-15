import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmailSubscription } from 'app/shared/model/email-subscription.model';
import { EmailSubscriptionService } from './email-subscription.service';
import { EmailSubscriptionComponent } from './email-subscription.component';
import { EmailSubscriptionDetailComponent } from './email-subscription-detail.component';
import { EmailSubscriptionUpdateComponent } from './email-subscription-update.component';
import { EmailSubscriptionDeletePopupComponent } from './email-subscription-delete-dialog.component';
import { IEmailSubscription } from 'app/shared/model/email-subscription.model';

@Injectable({ providedIn: 'root' })
export class EmailSubscriptionResolve implements Resolve<IEmailSubscription> {
    constructor(private service: EmailSubscriptionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((emailSubscription: HttpResponse<EmailSubscription>) => emailSubscription.body));
        }
        return of(new EmailSubscription());
    }
}

export const emailSubscriptionRoute: Routes = [
    {
        path: 'email-subscription',
        component: EmailSubscriptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.emailSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'email-subscription/:id/view',
        component: EmailSubscriptionDetailComponent,
        resolve: {
            emailSubscription: EmailSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.emailSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'email-subscription/new',
        component: EmailSubscriptionUpdateComponent,
        resolve: {
            emailSubscription: EmailSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.emailSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'email-subscription/:id/edit',
        component: EmailSubscriptionUpdateComponent,
        resolve: {
            emailSubscription: EmailSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.emailSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const emailSubscriptionPopupRoute: Routes = [
    {
        path: 'email-subscription/:id/delete',
        component: EmailSubscriptionDeletePopupComponent,
        resolve: {
            emailSubscription: EmailSubscriptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.emailSubscription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
