import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Niggle } from 'app/shared/model/niggle.model';
import { NiggleService } from './niggle.service';
import { NiggleComponent } from './niggle.component';
import { NiggleDetailComponent } from './niggle-detail.component';
import { NiggleUpdateComponent } from './niggle-update.component';
import { NiggleDeletePopupComponent } from './niggle-delete-dialog.component';
import { INiggle } from 'app/shared/model/niggle.model';

@Injectable({ providedIn: 'root' })
export class NiggleResolve implements Resolve<INiggle> {
    constructor(private service: NiggleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((niggle: HttpResponse<Niggle>) => niggle.body));
        }
        return of(new Niggle());
    }
}

export const niggleRoute: Routes = [
    {
        path: 'niggle',
        component: NiggleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niggle/:id/view',
        component: NiggleDetailComponent,
        resolve: {
            niggle: NiggleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niggle/new',
        component: NiggleUpdateComponent,
        resolve: {
            niggle: NiggleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niggle/:id/edit',
        component: NiggleUpdateComponent,
        resolve: {
            niggle: NiggleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nigglePopupRoute: Routes = [
    {
        path: 'niggle/:id/delete',
        component: NiggleDeletePopupComponent,
        resolve: {
            niggle: NiggleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
