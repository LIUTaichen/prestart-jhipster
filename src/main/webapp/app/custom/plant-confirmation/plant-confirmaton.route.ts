import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/';
import { PlantConfirmationComponent } from './plant-confirmation.component';

export const plantConfirmationRoute: Routes = [
    {
        path: 'confirm-plant',
        component: PlantConfirmationComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY'],
            pageTitle: 'prestartApp.prestartCheck.plant-confirmation.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
