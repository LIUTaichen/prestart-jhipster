import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PrestartQuestionComponent,
    PrestartQuestionDetailComponent,
    PrestartQuestionUpdateComponent,
    PrestartQuestionDeletePopupComponent,
    PrestartQuestionDeleteDialogComponent,
    prestartQuestionRoute,
    prestartQuestionPopupRoute
} from './';

const ENTITY_STATES = [...prestartQuestionRoute, ...prestartQuestionPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestartQuestionComponent,
        PrestartQuestionDetailComponent,
        PrestartQuestionUpdateComponent,
        PrestartQuestionDeleteDialogComponent,
        PrestartQuestionDeletePopupComponent
    ],
    entryComponents: [
        PrestartQuestionComponent,
        PrestartQuestionUpdateComponent,
        PrestartQuestionDeleteDialogComponent,
        PrestartQuestionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPrestartQuestionModule {}
