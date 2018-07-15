import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PrestartQuestionOptionComponent,
    PrestartQuestionOptionDetailComponent,
    PrestartQuestionOptionUpdateComponent,
    PrestartQuestionOptionDeletePopupComponent,
    PrestartQuestionOptionDeleteDialogComponent,
    prestartQuestionOptionRoute,
    prestartQuestionOptionPopupRoute
} from './';

const ENTITY_STATES = [...prestartQuestionOptionRoute, ...prestartQuestionOptionPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestartQuestionOptionComponent,
        PrestartQuestionOptionDetailComponent,
        PrestartQuestionOptionUpdateComponent,
        PrestartQuestionOptionDeleteDialogComponent,
        PrestartQuestionOptionDeletePopupComponent
    ],
    entryComponents: [
        PrestartQuestionOptionComponent,
        PrestartQuestionOptionUpdateComponent,
        PrestartQuestionOptionDeleteDialogComponent,
        PrestartQuestionOptionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPrestartQuestionOptionModule {}
