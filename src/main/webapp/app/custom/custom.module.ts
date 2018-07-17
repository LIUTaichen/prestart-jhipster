import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlantComponent } from './select-plant/select-plant.component';

import { CustomRoutingModule } from './custom-routing.module';
import { PrestartSharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { PlantConfirmationComponent } from './plant-confirmation/plant-confirmation.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
    imports: [CommonModule, CustomRoutingModule, PrestartSharedModule, MaterialModule],
    declarations: [SelectPlantComponent, PlantConfirmationComponent, QuestionsComponent]
})
export class CustomModule {}
