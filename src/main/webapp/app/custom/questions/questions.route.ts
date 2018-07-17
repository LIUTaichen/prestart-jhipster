import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/';
import { QuestionsComponent } from './questions.component';

export const questionsRoute: Routes = [
    {
        path: 'questions',
        component: QuestionsComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY'],
            pageTitle: 'prestartApp.prestartCheck.questsions.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
