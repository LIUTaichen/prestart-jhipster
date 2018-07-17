import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../core/';
import { SelectPlantComponent } from './select-plant.component';

export const selectPlantRoute: Routes = [
    {
        path: 'select-plant',
        component: SelectPlantComponent,
        data: {
            authorities: ['ROLE_DW', 'ROLE_DW_READ_ONLY'],
            pageTitle: 'prestartApp.prestartCheck.select-plant.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
