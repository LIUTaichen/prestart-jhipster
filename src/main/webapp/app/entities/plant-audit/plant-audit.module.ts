import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PlantAuditComponent,
    PlantAuditDetailComponent,
    PlantAuditUpdateComponent,
    PlantAuditDeletePopupComponent,
    PlantAuditDeleteDialogComponent,
    plantAuditRoute,
    plantAuditPopupRoute
} from './';

const ENTITY_STATES = [...plantAuditRoute, ...plantAuditPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PlantAuditComponent,
        PlantAuditDetailComponent,
        PlantAuditUpdateComponent,
        PlantAuditDeleteDialogComponent,
        PlantAuditDeletePopupComponent
    ],
    entryComponents: [PlantAuditComponent, PlantAuditUpdateComponent, PlantAuditDeleteDialogComponent, PlantAuditDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPlantAuditModule {}
