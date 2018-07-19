import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { IPlant } from 'app/shared/model/plant.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'jhi-meter-reading',
    templateUrl: './meter-reading.component.html',
    styleUrls: ['./meter-reading.component.css']
})
export class MeterReadingComponent implements OnInit {
    plant: IPlant;
    meterForm: FormGroup;
    constructor(private fb: FormBuilder, private prestartDataService: PrestartDataService) {}
    ngOnInit() {
        this.plant = this.prestartDataService.plant;
        this.createForm();
    }

    createForm() {
        this.meterForm = this.fb.group({
            meterReading: [this.plant.meterReading, Validators.required],
            hubboReading: [this.plant.hubboReading, Validators.required]
        });
    }

    onSubmit() {}
}
