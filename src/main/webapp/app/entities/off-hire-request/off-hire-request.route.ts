import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OffHireRequest } from 'app/shared/model/off-hire-request.model';
import { OffHireRequestService } from './off-hire-request.service';
import { OffHireRequestComponent } from './off-hire-request.component';
import { OffHireRequestDetailComponent } from './off-hire-request-detail.component';
import { OffHireRequestUpdateComponent } from './off-hire-request-update.component';
import { OffHireRequestDeletePopupComponent } from './off-hire-request-delete-dialog.component';
import { IOffHireRequest } from 'app/shared/model/off-hire-request.model';

@Injectable({ providedIn: 'root' })
export class OffHireRequestResolve implements Resolve<IOffHireRequest> {
    constructor(private service: OffHireRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((offHireRequest: HttpResponse<OffHireRequest>) => offHireRequest.body));
        }
        return of(new OffHireRequest());
    }
}

export const offHireRequestRoute: Routes = [
    {
        path: 'off-hire-request',
        component: OffHireRequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.offHireRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'off-hire-request/:id/view',
        component: OffHireRequestDetailComponent,
        resolve: {
            offHireRequest: OffHireRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.offHireRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'off-hire-request/new',
        component: OffHireRequestUpdateComponent,
        resolve: {
            offHireRequest: OffHireRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.offHireRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'off-hire-request/:id/edit',
        component: OffHireRequestUpdateComponent,
        resolve: {
            offHireRequest: OffHireRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.offHireRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const offHireRequestPopupRoute: Routes = [
    {
        path: 'off-hire-request/:id/delete',
        component: OffHireRequestDeletePopupComponent,
        resolve: {
            offHireRequest: OffHireRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.offHireRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
