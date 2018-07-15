import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PlantLogComponent,
    PlantLogDetailComponent,
    PlantLogUpdateComponent,
    PlantLogDeletePopupComponent,
    PlantLogDeleteDialogComponent,
    plantLogRoute,
    plantLogPopupRoute
} from './';

const ENTITY_STATES = [...plantLogRoute, ...plantLogPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PlantLogComponent,
        PlantLogDetailComponent,
        PlantLogUpdateComponent,
        PlantLogDeleteDialogComponent,
        PlantLogDeletePopupComponent
    ],
    entryComponents: [PlantLogComponent, PlantLogUpdateComponent, PlantLogDeleteDialogComponent, PlantLogDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPlantLogModule {}
