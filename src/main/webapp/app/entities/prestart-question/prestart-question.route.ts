import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionService } from './prestart-question.service';
import { PrestartQuestionComponent } from './prestart-question.component';
import { PrestartQuestionDetailComponent } from './prestart-question-detail.component';
import { PrestartQuestionUpdateComponent } from './prestart-question-update.component';
import { PrestartQuestionDeletePopupComponent } from './prestart-question-delete-dialog.component';
import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';

@Injectable({ providedIn: 'root' })
export class PrestartQuestionResolve implements Resolve<IPrestartQuestion> {
    constructor(private service: PrestartQuestionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((prestartQuestion: HttpResponse<PrestartQuestion>) => prestartQuestion.body));
        }
        return of(new PrestartQuestion());
    }
}

export const prestartQuestionRoute: Routes = [
    {
        path: 'prestart-question',
        component: PrestartQuestionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-question/:id/view',
        component: PrestartQuestionDetailComponent,
        resolve: {
            prestartQuestion: PrestartQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-question/new',
        component: PrestartQuestionUpdateComponent,
        resolve: {
            prestartQuestion: PrestartQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestart-question/:id/edit',
        component: PrestartQuestionUpdateComponent,
        resolve: {
            prestartQuestion: PrestartQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestartQuestionPopupRoute: Routes = [
    {
        path: 'prestart-question/:id/delete',
        component: PrestartQuestionDeletePopupComponent,
        resolve: {
            prestartQuestion: PrestartQuestionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestartApp.prestartQuestion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
