import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';
import { NiggleSnapshotService } from './niggle-snapshot.service';
import { NiggleSnapshotComponent } from './niggle-snapshot.component';
import { NiggleSnapshotDetailComponent } from './niggle-snapshot-detail.component';
import { NiggleSnapshotUpdateComponent } from './niggle-snapshot-update.component';
import { NiggleSnapshotDeletePopupComponent } from './niggle-snapshot-delete-dialog.component';
import { INiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';

@Injectable({ providedIn: 'root' })
export class NiggleSnapshotResolve implements Resolve<INiggleSnapshot> {
    constructor(private service: NiggleSnapshotService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((niggleSnapshot: HttpResponse<NiggleSnapshot>) => niggleSnapshot.body));
        }
        return of(new NiggleSnapshot());
    }
}

export const niggleSnapshotRoute: Routes = [
    {
        path: 'niggle-snapshot',
        component: NiggleSnapshotComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggleSnapshot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niggle-snapshot/:id/view',
        component: NiggleSnapshotDetailComponent,
        resolve: {
            niggleSnapshot: NiggleSnapshotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggleSnapshot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niggle-snapshot/new',
        component: NiggleSnapshotUpdateComponent,
        resolve: {
            niggleSnapshot: NiggleSnapshotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggleSnapshot.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'niggle-snapshot/:id/edit',
        component: NiggleSnapshotUpdateComponent,
        resolve: {
            niggleSnapshot: NiggleSnapshotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggleSnapshot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const niggleSnapshotPopupRoute: Routes = [
    {
        path: 'niggle-snapshot/:id/delete',
        component: NiggleSnapshotDeletePopupComponent,
        resolve: {
            niggleSnapshot: NiggleSnapshotResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.niggleSnapshot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
