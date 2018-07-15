import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    EmailSubscriptionComponent,
    EmailSubscriptionDetailComponent,
    EmailSubscriptionUpdateComponent,
    EmailSubscriptionDeletePopupComponent,
    EmailSubscriptionDeleteDialogComponent,
    emailSubscriptionRoute,
    emailSubscriptionPopupRoute
} from './';

const ENTITY_STATES = [...emailSubscriptionRoute, ...emailSubscriptionPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmailSubscriptionComponent,
        EmailSubscriptionDetailComponent,
        EmailSubscriptionUpdateComponent,
        EmailSubscriptionDeleteDialogComponent,
        EmailSubscriptionDeletePopupComponent
    ],
    entryComponents: [
        EmailSubscriptionComponent,
        EmailSubscriptionUpdateComponent,
        EmailSubscriptionDeleteDialogComponent,
        EmailSubscriptionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartEmailSubscriptionModule {}
