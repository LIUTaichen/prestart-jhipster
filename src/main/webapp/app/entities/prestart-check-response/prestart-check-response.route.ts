import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';
import { PrestartCheckResponseService } from './prestart-check-response.service';
import { PrestartCheckResponseComponent } from './prestart-check-response.component';
import { PrestartCheckResponseDetailComponent } from './prestart-check-response-detail.component';
import { PrestartCheckResponseUpdateComponent } from './prestart-check-response-update.component';
import { PrestartCheckResponseDeletePopupComponent } from './prestart-check-response-delete-dialog.component';
import { IPrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';

@Injectable({ providedIn: 'root' })
export class PrestartCheckResponseResolve implements Resolve<IPrestartCheckResponse> {
    constructor(private service: PrestartCheckResponseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((prestartCheckResponse: HttpResponse<PrestartCheckResponse>) => prestartCheckResponse.body));
        }
        return of(new PrestartCheckResponse());
    }
}

export const prestartCheckResponseRoute: Routes = [
    {
        path: 'prestart-check-response',
        component: PrestartCheckResponseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckResponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-response/:id/view',
        component: PrestartCheckResponseDetailComponent,
        resolve: {
            prestartCheckResponse: PrestartCheckResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckResponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-response/new',
        component: PrestartCheckResponseUpdateComponent,
        resolve: {
            prestartCheckResponse: PrestartCheckResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckResponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-response/:id/edit',
        component: PrestartCheckResponseUpdateComponent,
        resolve: {
            prestartCheckResponse: PrestartCheckResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckResponse.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestartCheckResponsePopupRoute: Routes = [
    {
        path: 'prestart-check-response/:id/delete',
        component: PrestartCheckResponseDeletePopupComponent,
        resolve: {
            prestartCheckResponse: PrestartCheckResponseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckResponse.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
