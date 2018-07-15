import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    NiggleComponent,
    NiggleDetailComponent,
    NiggleUpdateComponent,
    NiggleDeletePopupComponent,
    NiggleDeleteDialogComponent,
    niggleRoute,
    nigglePopupRoute
} from './';

const ENTITY_STATES = [...niggleRoute, ...nigglePopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [NiggleComponent, NiggleDetailComponent, NiggleUpdateComponent, NiggleDeleteDialogComponent, NiggleDeletePopupComponent],
    entryComponents: [NiggleComponent, NiggleUpdateComponent, NiggleDeleteDialogComponent, NiggleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartNiggleModule {}
