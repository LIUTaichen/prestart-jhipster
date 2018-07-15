import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    NiggleSnapshotComponent,
    NiggleSnapshotDetailComponent,
    NiggleSnapshotUpdateComponent,
    NiggleSnapshotDeletePopupComponent,
    NiggleSnapshotDeleteDialogComponent,
    niggleSnapshotRoute,
    niggleSnapshotPopupRoute
} from './';

const ENTITY_STATES = [...niggleSnapshotRoute, ...niggleSnapshotPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NiggleSnapshotComponent,
        NiggleSnapshotDetailComponent,
        NiggleSnapshotUpdateComponent,
        NiggleSnapshotDeleteDialogComponent,
        NiggleSnapshotDeletePopupComponent
    ],
    entryComponents: [
        NiggleSnapshotComponent,
        NiggleSnapshotUpdateComponent,
        NiggleSnapshotDeleteDialogComponent,
        NiggleSnapshotDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartNiggleSnapshotModule {}
