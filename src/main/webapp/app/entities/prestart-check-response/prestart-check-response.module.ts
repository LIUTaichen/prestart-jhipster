import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PrestartCheckResponseComponent,
    PrestartCheckResponseDetailComponent,
    PrestartCheckResponseUpdateComponent,
    PrestartCheckResponseDeletePopupComponent,
    PrestartCheckResponseDeleteDialogComponent,
    prestartCheckResponseRoute,
    prestartCheckResponsePopupRoute
} from './';

const ENTITY_STATES = [...prestartCheckResponseRoute, ...prestartCheckResponsePopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestartCheckResponseComponent,
        PrestartCheckResponseDetailComponent,
        PrestartCheckResponseUpdateComponent,
        PrestartCheckResponseDeleteDialogComponent,
        PrestartCheckResponseDeletePopupComponent
    ],
    entryComponents: [
        PrestartCheckResponseComponent,
        PrestartCheckResponseUpdateComponent,
        PrestartCheckResponseDeleteDialogComponent,
        PrestartCheckResponseDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPrestartCheckResponseModule {}
