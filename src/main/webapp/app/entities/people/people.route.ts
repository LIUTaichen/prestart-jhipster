import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { People } from 'app/shared/model/people.model';
import { PeopleService } from './people.service';
import { PeopleComponent } from './people.component';
import { PeopleDetailComponent } from './people-detail.component';
import { PeopleUpdateComponent } from './people-update.component';
import { PeopleDeletePopupComponent } from './people-delete-dialog.component';
import { IPeople } from 'app/shared/model/people.model';

@Injectable({ providedIn: 'root' })
export class PeopleResolve implements Resolve<IPeople> {
    constructor(private service: PeopleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((people: HttpResponse<People>) => people.body));
        }
        return of(new People());
    }
}

export const peopleRoute: Routes = [
    {
        path: 'people',
        component: PeopleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.people.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'people/:id/view',
        component: PeopleDetailComponent,
        resolve: {
            people: PeopleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.people.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'people/new',
        component: PeopleUpdateComponent,
        resolve: {
            people: PeopleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.people.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'people/:id/edit',
        component: PeopleUpdateComponent,
        resolve: {
            people: PeopleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.people.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const peoplePopupRoute: Routes = [
    {
        path: 'people/:id/delete',
        component: PeopleDeletePopupComponent,
        resolve: {
            people: PeopleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.people.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
