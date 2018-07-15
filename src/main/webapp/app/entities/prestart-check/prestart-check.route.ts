import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestartCheck } from 'app/shared/model/prestart-check.model';
import { PrestartCheckService } from './prestart-check.service';
import { PrestartCheckComponent } from './prestart-check.component';
import { PrestartCheckDetailComponent } from './prestart-check-detail.component';
import { PrestartCheckUpdateComponent } from './prestart-check-update.component';
import { PrestartCheckDeletePopupComponent } from './prestart-check-delete-dialog.component';
import { IPrestartCheck } from 'app/shared/model/prestart-check.model';

@Injectable({ providedIn: 'root' })
export class PrestartCheckResolve implements Resolve<IPrestartCheck> {
    constructor(private service: PrestartCheckService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((prestartCheck: HttpResponse<PrestartCheck>) => prestartCheck.body));
        }
        return of(new PrestartCheck());
    }
}

export const prestartCheckRoute: Routes = [
    {
        path: 'prestart-check',
        component: PrestartCheckComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check/:id/view',
        component: PrestartCheckDetailComponent,
        resolve: {
            prestartCheck: PrestartCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check/new',
        component: PrestartCheckUpdateComponent,
        resolve: {
            prestartCheck: PrestartCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check/:id/edit',
        component: PrestartCheckUpdateComponent,
        resolve: {
            prestartCheck: PrestartCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheck.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestartCheckPopupRoute: Routes = [
    {
        path: 'prestart-check/:id/delete',
        component: PrestartCheckDeletePopupComponent,
        resolve: {
            prestartCheck: PrestartCheckResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheck.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
