import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Competency } from 'app/shared/model/competency.model';
import { CompetencyService } from './competency.service';
import { CompetencyComponent } from './competency.component';
import { CompetencyDetailComponent } from './competency-detail.component';
import { CompetencyUpdateComponent } from './competency-update.component';
import { CompetencyDeletePopupComponent } from './competency-delete-dialog.component';
import { ICompetency } from 'app/shared/model/competency.model';

@Injectable({ providedIn: 'root' })
export class CompetencyResolve implements Resolve<ICompetency> {
    constructor(private service: CompetencyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((competency: HttpResponse<Competency>) => competency.body));
        }
        return of(new Competency());
    }
}

export const competencyRoute: Routes = [
    {
        path: 'competency',
        component: CompetencyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.competency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competency/:id/view',
        component: CompetencyDetailComponent,
        resolve: {
            competency: CompetencyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.competency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competency/new',
        component: CompetencyUpdateComponent,
        resolve: {
            competency: CompetencyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.competency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competency/:id/edit',
        component: CompetencyUpdateComponent,
        resolve: {
            competency: CompetencyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.competency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const competencyPopupRoute: Routes = [
    {
        path: 'competency/:id/delete',
        component: CompetencyDeletePopupComponent,
        resolve: {
            competency: CompetencyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.competency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
