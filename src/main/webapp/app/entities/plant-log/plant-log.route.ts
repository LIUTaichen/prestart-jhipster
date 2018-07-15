import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from './plant-log.service';
import { PlantLogComponent } from './plant-log.component';
import { PlantLogDetailComponent } from './plant-log-detail.component';
import { PlantLogUpdateComponent } from './plant-log-update.component';
import { PlantLogDeletePopupComponent } from './plant-log-delete-dialog.component';
import { IPlantLog } from 'app/shared/model/plant-log.model';

@Injectable({ providedIn: 'root' })
export class PlantLogResolve implements Resolve<IPlantLog> {
    constructor(private service: PlantLogService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((plantLog: HttpResponse<PlantLog>) => plantLog.body));
        }
        return of(new PlantLog());
    }
}

export const plantLogRoute: Routes = [
    {
        path: 'plant-log',
        component: PlantLogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-log/:id/view',
        component: PlantLogDetailComponent,
        resolve: {
            plantLog: PlantLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-log/new',
        component: PlantLogUpdateComponent,
        resolve: {
            plantLog: PlantLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-log/:id/edit',
        component: PlantLogUpdateComponent,
        resolve: {
            plantLog: PlantLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const plantLogPopupRoute: Routes = [
    {
        path: 'plant-log/:id/delete',
        component: PlantLogDeletePopupComponent,
        resolve: {
            plantLog: PlantLogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.plantLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
