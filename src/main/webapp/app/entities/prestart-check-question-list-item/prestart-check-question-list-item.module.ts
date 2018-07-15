import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PrestartCheckQuestionListItemComponent,
    PrestartCheckQuestionListItemDetailComponent,
    PrestartCheckQuestionListItemUpdateComponent,
    PrestartCheckQuestionListItemDeletePopupComponent,
    PrestartCheckQuestionListItemDeleteDialogComponent,
    prestartCheckQuestionListItemRoute,
    prestartCheckQuestionListItemPopupRoute
} from './';

const ENTITY_STATES = [...prestartCheckQuestionListItemRoute, ...prestartCheckQuestionListItemPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestartCheckQuestionListItemComponent,
        PrestartCheckQuestionListItemDetailComponent,
        PrestartCheckQuestionListItemUpdateComponent,
        PrestartCheckQuestionListItemDeleteDialogComponent,
        PrestartCheckQuestionListItemDeletePopupComponent
    ],
    entryComponents: [
        PrestartCheckQuestionListItemComponent,
        PrestartCheckQuestionListItemUpdateComponent,
        PrestartCheckQuestionListItemDeleteDialogComponent,
        PrestartCheckQuestionListItemDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPrestartCheckQuestionListItemModule {}
