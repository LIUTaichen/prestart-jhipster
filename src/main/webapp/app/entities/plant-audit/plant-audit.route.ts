import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlantAudit } from 'app/shared/model/plant-audit.model';
import { PlantAuditService } from './plant-audit.service';
import { PlantAuditComponent } from './plant-audit.component';
import { PlantAuditDetailComponent } from './plant-audit-detail.component';
import { PlantAuditUpdateComponent } from './plant-audit-update.component';
import { PlantAuditDeletePopupComponent } from './plant-audit-delete-dialog.component';
import { IPlantAudit } from 'app/shared/model/plant-audit.model';

@Injectable({ providedIn: 'root' })
export class PlantAuditResolve implements Resolve<IPlantAudit> {
    constructor(private service: PlantAuditService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((plantAudit: HttpResponse<PlantAudit>) => plantAudit.body));
        }
        return of(new PlantAudit());
    }
}

export const plantAuditRoute: Routes = [
    {
        path: 'plant-audit',
        component: PlantAuditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-audit/:id/view',
        component: PlantAuditDetailComponent,
        resolve: {
            plantAudit: PlantAuditResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-audit/new',
        component: PlantAuditUpdateComponent,
        resolve: {
            plantAudit: PlantAuditResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-audit/:id/edit',
        component: PlantAuditUpdateComponent,
        resolve: {
            plantAudit: PlantAuditResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantAudit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plantAuditPopupRoute: Routes = [
    {
        path: 'plant-audit/:id/delete',
        component: PlantAuditDeletePopupComponent,
        resolve: {
            plantAudit: PlantAuditResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantAudit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
