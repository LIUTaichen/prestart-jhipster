import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomRoutingModule } from '../custom-routing.module';
import { PrestartSharedModule } from '../../shared';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomRoutingModule, PrestartSharedModule, MaterialModule],
    declarations: []
})
export class AuditModule {}
