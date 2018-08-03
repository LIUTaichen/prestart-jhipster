import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { IPlant } from 'app/shared/model/plant.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-meter-reading',
    templateUrl: './meter-reading.component.html',
    styleUrls: ['./meter-reading.component.css']
})
export class MeterReadingComponent implements OnInit {
    plant: IPlant;
    meterForm: FormGroup;
    constructor(private fb: FormBuilder, private prestartDataService: PrestartDataService, private router: Router) {}

    ngOnInit() {
        this.plant = this.prestartDataService.data.plant;
        this.createForm();
    }

    createForm() {
        this.meterForm = this.fb.group({
            meterReading: [this.prestartDataService.data.meterReading, [Validators.required, Validators.min(this.plant.meterReading)]]
            // hubboReading: ['', Validators.required]
        });
        if (this.plant.hubboReading) {
            this.meterForm.addControl(
                'hubboReading',
                new FormControl(this.prestartDataService.data.hubboReading, [Validators.required, Validators.min(this.plant.hubboReading)])
            );
        }
    }

    onSubmit() {
        const data = this.prestartDataService.data;
        data.meterReading = this.meterForm.value.meterReading;
        if (this.plant.hubboReading) {
            data.hubboReading = this.meterForm.value.hubboReading;
        }
        this.prestartDataService.setData(data);
        this.router.navigate(['/notes']);
    }

    isValid(value: string): Boolean {
        const validInputRegExp: RegExp = /^\d*(\.\d{0,2})?$/i;
        const isValid = validInputRegExp.test(value);
        return isValid;
    }

    onKeyup($event: KeyboardEvent) {
        console.log('onKeyup', $event.target['value']);
        if (!$event.target['value']) {
            console.log('empty value');
            console.log('last value', this.meterForm.value.meterReading);
            // this.meterForm.patchValue({
            //     meterReading: this.meterForm.value.meterReading
            // });
            $event.stopPropagation();
            $event.preventDefault();
        } else if (!this.isValid($event.target['value'])) {
            console.log('not valid');
            if ($event.target['value'] < 0) {
                this.meterForm.patchValue({
                    meterReading: -$event.target['value']
                });
            } else {
                const valueString = $event.target['value'].toString();
                const previsouValue = valueString.substring(0, valueString.length - 1);
                const previousNumber = parseFloat(previsouValue);
                this.meterForm.patchValue({
                    meterReading: previousNumber
                });
            }
        }
    }
}
