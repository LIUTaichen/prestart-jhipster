import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import {
    PurchaseOrderComponent,
    PurchaseOrderDetailComponent,
    PurchaseOrderUpdateComponent,
    PurchaseOrderDeletePopupComponent,
    PurchaseOrderDeleteDialogComponent,
    purchaseOrderRoute,
    purchaseOrderPopupRoute
} from './';

const ENTITY_STATES = [...purchaseOrderRoute, ...purchaseOrderPopupRoute];

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PurchaseOrderComponent,
        PurchaseOrderDetailComponent,
        PurchaseOrderUpdateComponent,
        PurchaseOrderDeleteDialogComponent,
        PurchaseOrderDeletePopupComponent
    ],
    entryComponents: [
        PurchaseOrderComponent,
        PurchaseOrderUpdateComponent,
        PurchaseOrderDeleteDialogComponent,
        PurchaseOrderDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartPurchaseOrderModule {}
