import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';
import { MaintenanceContractorService } from './maintenance-contractor.service';
import { MaintenanceContractorComponent } from './maintenance-contractor.component';
import { MaintenanceContractorDetailComponent } from './maintenance-contractor-detail.component';
import { MaintenanceContractorUpdateComponent } from './maintenance-contractor-update.component';
import { MaintenanceContractorDeletePopupComponent } from './maintenance-contractor-delete-dialog.component';
import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';

@Injectable({ providedIn: 'root' })
export class MaintenanceContractorResolve implements Resolve<IMaintenanceContractor> {
    constructor(private service: MaintenanceContractorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((maintenanceContractor: HttpResponse<MaintenanceContractor>) => maintenanceContractor.body));
        }
        return of(new MaintenanceContractor());
    }
}

export const maintenanceContractorRoute: Routes = [
    {
        path: 'maintenance-contractor',
        component: MaintenanceContractorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.maintenanceContractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'maintenance-contractor/:id/view',
        component: MaintenanceContractorDetailComponent,
        resolve: {
            maintenanceContractor: MaintenanceContractorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.maintenanceContractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'maintenance-contractor/new',
        component: MaintenanceContractorUpdateComponent,
        resolve: {
            maintenanceContractor: MaintenanceContractorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.maintenanceContractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'maintenance-contractor/:id/edit',
        component: MaintenanceContractorUpdateComponent,
        resolve: {
            maintenanceContractor: MaintenanceContractorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.maintenanceContractor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const maintenanceContractorPopupRoute: Routes = [
    {
        path: 'maintenance-contractor/:id/delete',
        component: MaintenanceContractorDeletePopupComponent,
        resolve: {
            maintenanceContractor: MaintenanceContractorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.maintenanceContractor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
