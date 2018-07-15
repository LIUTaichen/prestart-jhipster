import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PrestartCheckConfigComponent,
    PrestartCheckConfigDetailComponent,
    PrestartCheckConfigUpdateComponent,
    PrestartCheckConfigDeletePopupComponent,
    PrestartCheckConfigDeleteDialogComponent,
    prestartCheckConfigRoute,
    prestartCheckConfigPopupRoute
} from './';

const ENTITY_STATES = [...prestartCheckConfigRoute, ...prestartCheckConfigPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestartCheckConfigComponent,
        PrestartCheckConfigDetailComponent,
        PrestartCheckConfigUpdateComponent,
        PrestartCheckConfigDeleteDialogComponent,
        PrestartCheckConfigDeletePopupComponent
    ],
    entryComponents: [
        PrestartCheckConfigComponent,
        PrestartCheckConfigUpdateComponent,
        PrestartCheckConfigDeleteDialogComponent,
        PrestartCheckConfigDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPrestartCheckConfigModule {}
