import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    MaintenanceContractorComponent,
    MaintenanceContractorDetailComponent,
    MaintenanceContractorUpdateComponent,
    MaintenanceContractorDeletePopupComponent,
    MaintenanceContractorDeleteDialogComponent,
    maintenanceContractorRoute,
    maintenanceContractorPopupRoute
} from './';

const ENTITY_STATES = [...maintenanceContractorRoute, ...maintenanceContractorPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MaintenanceContractorComponent,
        MaintenanceContractorDetailComponent,
        MaintenanceContractorUpdateComponent,
        MaintenanceContractorDeleteDialogComponent,
        MaintenanceContractorDeletePopupComponent
    ],
    entryComponents: [
        MaintenanceContractorComponent,
        MaintenanceContractorUpdateComponent,
        MaintenanceContractorDeleteDialogComponent,
        MaintenanceContractorDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartMaintenanceContractorModule {}
