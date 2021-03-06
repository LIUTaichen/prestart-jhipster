import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PlantComponent,
    PlantDetailComponent,
    PlantUpdateComponent,
    PlantDeletePopupComponent,
    PlantDeleteDialogComponent,
    plantRoute,
    plantPopupRoute
} from './';

const ENTITY_STATES = [...plantRoute, ...plantPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PlantComponent, PlantDetailComponent, PlantUpdateComponent, PlantDeleteDialogComponent, PlantDeletePopupComponent],
    entryComponents: [PlantComponent, PlantUpdateComponent, PlantDeleteDialogComponent, PlantDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPlantModule {}
