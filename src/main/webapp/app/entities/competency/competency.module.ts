import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    CompetencyComponent,
    CompetencyDetailComponent,
    CompetencyUpdateComponent,
    CompetencyDeletePopupComponent,
    CompetencyDeleteDialogComponent,
    competencyRoute,
    competencyPopupRoute
} from './';

const ENTITY_STATES = [...competencyRoute, ...competencyPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompetencyComponent,
        CompetencyDetailComponent,
        CompetencyUpdateComponent,
        CompetencyDeleteDialogComponent,
        CompetencyDeletePopupComponent
    ],
    entryComponents: [CompetencyComponent, CompetencyUpdateComponent, CompetencyDeleteDialogComponent, CompetencyDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartCompetencyModule {}
