import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PeopleComponent,
    PeopleDetailComponent,
    PeopleUpdateComponent,
    PeopleDeletePopupComponent,
    PeopleDeleteDialogComponent,
    peopleRoute,
    peoplePopupRoute
} from './';

const ENTITY_STATES = [...peopleRoute, ...peoplePopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PeopleComponent, PeopleDetailComponent, PeopleUpdateComponent, PeopleDeleteDialogComponent, PeopleDeletePopupComponent],
    entryComponents: [PeopleComponent, PeopleUpdateComponent, PeopleDeleteDialogComponent, PeopleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPeopleModule {}
