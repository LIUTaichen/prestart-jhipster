import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';
import { PrestartCheckQuestionListItemService } from './prestart-check-question-list-item.service';
import { PrestartCheckQuestionListItemComponent } from './prestart-check-question-list-item.component';
import { PrestartCheckQuestionListItemDetailComponent } from './prestart-check-question-list-item-detail.component';
import { PrestartCheckQuestionListItemUpdateComponent } from './prestart-check-question-list-item-update.component';
import { PrestartCheckQuestionListItemDeletePopupComponent } from './prestart-check-question-list-item-delete-dialog.component';
import { IPrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';

@Injectable({ providedIn: 'root' })
export class PrestartCheckQuestionListItemResolve implements Resolve<IPrestartCheckQuestionListItem> {
    constructor(private service: PrestartCheckQuestionListItemService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(
                    map((prestartCheckQuestionListItem: HttpResponse<PrestartCheckQuestionListItem>) => prestartCheckQuestionListItem.body)
                );
        }
        return of(new PrestartCheckQuestionListItem());
    }
}

export const prestartCheckQuestionListItemRoute: Routes = [
    {
        path: 'prestart-check-question-list-item',
        component: PrestartCheckQuestionListItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckQuestionListItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-question-list-item/:id/view',
        component: PrestartCheckQuestionListItemDetailComponent,
        resolve: {
            prestartCheckQuestionListItem: PrestartCheckQuestionListItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckQuestionListItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-question-list-item/new',
        component: PrestartCheckQuestionListItemUpdateComponent,
        resolve: {
            prestartCheckQuestionListItem: PrestartCheckQuestionListItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckQuestionListItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-check-question-list-item/:id/edit',
        component: PrestartCheckQuestionListItemUpdateComponent,
        resolve: {
            prestartCheckQuestionListItem: PrestartCheckQuestionListItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckQuestionListItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestartCheckQuestionListItemPopupRoute: Routes = [
    {
        path: 'prestart-check-question-list-item/:id/delete',
        component: PrestartCheckQuestionListItemDeletePopupComponent,
        resolve: {
            prestartCheckQuestionListItem: PrestartCheckQuestionListItemResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartCheckQuestionListItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
