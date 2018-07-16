import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestartSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { MaterialModule } from '../shared/material.module';

@NgModule({
    imports: [PrestartSharedModule, RouterModule.forChild([HOME_ROUTE]), MaterialModule],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartHomeModule {}
