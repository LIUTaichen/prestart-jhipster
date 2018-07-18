import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectPlantComponent } from './select-plant/select-plant.component';

import { CustomRoutingModule } from './custom-routing.module';
import { PrestartSharedModule } from '../shared';
import { MaterialModule } from '../shared/material.module';
import { PlantConfirmationComponent } from './plant-confirmation/plant-confirmation.component';
import { QuestionsComponent } from './questions/questions.component';
import { MeterReadingComponent } from './meter-reading/meter-reading.component';
import { ReviewComponent } from './review/review.component';
import { SubmissionComponent } from './submission/submission.component';
import { ResultComponent } from './result/result.component';

@NgModule({
    imports: [CommonModule, CustomRoutingModule, PrestartSharedModule, MaterialModule],
    declarations: [
        SelectPlantComponent,
        PlantConfirmationComponent,
        QuestionsComponent,
        MeterReadingComponent,
        ReviewComponent,
        SubmissionComponent,
        ResultComponent
    ]
})
export class CustomModule {}
