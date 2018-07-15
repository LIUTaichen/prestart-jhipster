import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { PrestartQuestionOptionService } from './prestart-question-option.service';
import { PrestartQuestionOptionComponent } from './prestart-question-option.component';
import { PrestartQuestionOptionDetailComponent } from './prestart-question-option-detail.component';
import { PrestartQuestionOptionUpdateComponent } from './prestart-question-option-update.component';
import { PrestartQuestionOptionDeletePopupComponent } from './prestart-question-option-delete-dialog.component';
import { IPrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

@Injectable({ providedIn: 'root' })
export class PrestartQuestionOptionResolve implements Resolve<IPrestartQuestionOption> {
    constructor(private service: PrestartQuestionOptionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((prestartQuestionOption: HttpResponse<PrestartQuestionOption>) => prestartQuestionOption.body));
        }
        return of(new PrestartQuestionOption());
    }
}

export const prestartQuestionOptionRoute: Routes = [
    {
        path: 'prestart-question-option',
        component: PrestartQuestionOptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestionOption.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-question-option/:id/view',
        component: PrestartQuestionOptionDetailComponent,
        resolve: {
            prestartQuestionOption: PrestartQuestionOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestionOption.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-question-option/new',
        component: PrestartQuestionOptionUpdateComponent,
        resolve: {
            prestartQuestionOption: PrestartQuestionOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestionOption.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-question-option/:id/edit',
        component: PrestartQuestionOptionUpdateComponent,
        resolve: {
            prestartQuestionOption: PrestartQuestionOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestionOption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestartQuestionOptionPopupRoute: Routes = [
    {
        path: 'prestart-question-option/:id/delete',
        component: PrestartQuestionOptionDeletePopupComponent,
        resolve: {
            prestartQuestionOption: PrestartQuestionOptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestionOption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
