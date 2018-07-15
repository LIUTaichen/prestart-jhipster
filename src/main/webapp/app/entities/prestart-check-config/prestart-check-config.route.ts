import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { PrestartCheckConfigService } from './prestart-check-config.service';
import { PrestartCheckConfigComponent } from './prestart-check-config.component';
import { PrestartCheckConfigDetailComponent } from './prestart-check-config-detail.component';
import { PrestartCheckConfigUpdateComponent } from './prestart-check-config-update.component';
import { PrestartCheckConfigDeletePopupComponent } from './prestart-check-config-delete-dialog.component';
import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';

@Injectable({ providedIn: 'root' })
export class PrestartCheckConfigResolve implements Resolve<IPrestartCheckConfig> {
    constructor(private service: PrestartCheckConfigService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((prestartCheckConfig: HttpResponse<PrestartCheckConfig>) => prestartCheckConfig.body));
        }
        return of(new PrestartCheckConfig());
    }
}

export const prestartCheckConfigRoute: Routes = [
    {
        path: 'prestart-check-config',
        component: PrestartCheckConfigComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-config/:id/view',
        component: PrestartCheckConfigDetailComponent,
        resolve: {
            prestartCheckConfig: PrestartCheckConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-config/new',
        component: PrestartCheckConfigUpdateComponent,
        resolve: {
            prestartCheckConfig: PrestartCheckConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-config/:id/edit',
        component: PrestartCheckConfigUpdateComponent,
        resolve: {
            prestartCheckConfig: PrestartCheckConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckConfig.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestartCheckConfigPopupRoute: Routes = [
    {
        path: 'prestart-check-config/:id/delete',
        component: PrestartCheckConfigDeletePopupComponent,
        resolve: {
            prestartCheckConfig: PrestartCheckConfigResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckConfig.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
