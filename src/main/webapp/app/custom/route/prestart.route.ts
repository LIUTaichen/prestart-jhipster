import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/';
import { QuestionsComponent } from '../questions/questions.component';
import { SelectPlantComponent } from '../select-plant/select-plant.component';
import { PlantConfirmationComponent } from '../plant-confirmation/plant-confirmation.component';
import { MeterReadingComponent } from '../meter-reading/meter-reading.component';
import { ReviewComponent } from '../review/review.component';
import { SubmissionComponent } from '../submission/submission.component';
import { ResultComponent } from '../result/result.component';
import { AzureCallbackComponent } from '../azure-callback/azure-callback.component';
import { AzureCallbackGuard } from '../azure-callback/azure-callback.guard';
import { NotesComponent } from 'app/custom/notes/notes.component';

export const prestartRoute: Routes = [
    {
        path: 'select-plant',
        component: SelectPlantComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.select-plant.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'plant-confirmation',
        component: PlantConfirmationComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.plant-confirmation.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'questions',
        component: QuestionsComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.questions.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'meter-reading',
        component: MeterReadingComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.meter-reading.title'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: 'review',
        component: ReviewComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.review.title'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: 'submission',
        component: SubmissionComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.submission.title'
        },
        canActivate: [UserRouteAccessService]
    },

    {
        path: 'result',
        component: ResultComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.result.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notes',
        component: NotesComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY', 'ROLE_REPORTER'],
            pageTitle: 'prestartApp.prestartCheck.notes.title'
        },
        canActivate: [UserRouteAccessService]
    },
    { path: 'id_token', component: AzureCallbackComponent, canActivate: [AzureCallbackGuard] }
];
