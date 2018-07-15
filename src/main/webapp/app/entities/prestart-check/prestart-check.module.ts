import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PrestartCheckComponent,
    PrestartCheckDetailComponent,
    PrestartCheckUpdateComponent,
    PrestartCheckDeletePopupComponent,
    PrestartCheckDeleteDialogComponent,
    prestartCheckRoute,
    prestartCheckPopupRoute
} from './';

const ENTITY_STATES = [...prestartCheckRoute, ...prestartCheckPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestartCheckComponent,
        PrestartCheckDetailComponent,
        PrestartCheckUpdateComponent,
        PrestartCheckDeleteDialogComponent,
        PrestartCheckDeletePopupComponent
    ],
    entryComponents: [
        PrestartCheckComponent,
        PrestartCheckUpdateComponent,
        PrestartCheckDeleteDialogComponent,
        PrestartCheckDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPrestartCheckModule {}
