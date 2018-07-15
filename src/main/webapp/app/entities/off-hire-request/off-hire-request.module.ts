import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    OffHireRequestComponent,
    OffHireRequestDetailComponent,
    OffHireRequestUpdateComponent,
    OffHireRequestDeletePopupComponent,
    OffHireRequestDeleteDialogComponent,
    offHireRequestRoute,
    offHireRequestPopupRoute
} from './';

const ENTITY_STATES = [...offHireRequestRoute, ...offHireRequestPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OffHireRequestComponent,
        OffHireRequestDetailComponent,
        OffHireRequestUpdateComponent,
        OffHireRequestDeleteDialogComponent,
        OffHireRequestDeletePopupComponent
    ],
    entryComponents: [
        OffHireRequestComponent,
        OffHireRequestUpdateComponent,
        OffHireRequestDeleteDialogComponent,
        OffHireRequestDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartOffHireRequestModule {}
