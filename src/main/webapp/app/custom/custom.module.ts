import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SignaturePadModule } from 'angular2-signaturepad';
import { AzureCallbackComponent } from './azure-callback/azure-callback.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomRoutingModule,
        PrestartSharedModule,
        MaterialModule,
        SignaturePadModule
    ],
    declarations: [
        SelectPlantComponent,
        PlantConfirmationComponent,
        QuestionsComponent,
        MeterReadingComponent,
        ReviewComponent,
        SubmissionComponent,
        ResultComponent,
        AzureCallbackComponent,
        NotesComponent
    ]
})
export class CustomModule {}
