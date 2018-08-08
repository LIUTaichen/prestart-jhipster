import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { IPlant, MaintenanceType } from 'app/shared/model/plant.model';
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
        this.plant = this.prestartDataService.data.plantLog.plant;
        this.createForm();
    }

    createForm() {
        this.meterForm = this.fb.group({
            // meterReading: [this.prestartDataService.data.meterReading, [Validators.required, Validators.min(this.plant.meterReading)]],
            // hubboReading: ['', Validators.required]
        });
        if (this.plant.maintenanceType === MaintenanceType.METER_BASED) {
            this.meterForm.addControl(
                'meterReading',
                new FormControl(this.prestartDataService.data.plantLog.meterReading, [
                    Validators.required,
                    Validators.min(this.plant.meterReading)
                ])
            );
            this.meterForm.addControl(
                'serviceDueAt',
                new FormControl(this.prestartDataService.data.plantLog.maintenanceDueAt, [
                    Validators.required,
                    Validators.min(this.plant.maintenanceDueAt)
                ])
            );
        }

        if (this.plant.maintenanceType === MaintenanceType.TIME_BASED) {
            this.meterForm.addControl(
                'serviceDueDate',
                new FormControl(this.prestartDataService.data.plantLog.maintenanceDueDate, [Validators.required])
            );
        }
        if (this.plant.hubboReading) {
            this.meterForm.addControl(
                'hubboReading',
                new FormControl(this.prestartDataService.data.plantLog.hubboReading, [
                    Validators.required,
                    Validators.min(this.plant.hubboReading)
                ])
            );
        }
        if (this.plant.rucDueAtKm) {
            this.meterForm.addControl(
                'rucDueAt',
                new FormControl(this.prestartDataService.data.plantLog.rucDueAt, [
                    Validators.required,
                    Validators.min(this.plant.rucDueAtKm)
                ])
            );
        }
        if (this.plant.registrationDueDate) {
            this.meterForm.addControl(
                'regoDueDate',
                new FormControl(this.prestartDataService.data.plantLog.registrationDueDate, [Validators.required])
            );
        }
        if (this.plant.certificateDueDate) {
            this.meterForm.addControl(
                'certDueDate',
                new FormControl(this.prestartDataService.data.plantLog.certificateDueDate, [Validators.required])
            );
        }
    }

    onSubmit() {
        const data = this.prestartDataService.data;

        if (this.plant.maintenanceType === MaintenanceType.METER_BASED) {
            data.plantLog.meterReading = this.meterForm.value.meterReading;
            data.plantLog.maintenanceDueAt = this.meterForm.value.serviceDueAt;
        }

        if (this.plant.maintenanceType === MaintenanceType.TIME_BASED) {
            data.plantLog.maintenanceDueDate = this.meterForm.value.serviceDueDate;
        }
        if (this.plant.hubboReading) {
            data.plantLog.hubboReading = this.meterForm.value.hubboReading;
            data.plantLog.rucDueAt = this.meterForm.value.rucDueAt;
        }
        if (this.plant.registrationDueDate) {
            data.plantLog.registrationDueDate = this.meterForm.value.regoDueDate;
        }
        if (this.plant.certificateDueDate) {
            data.plantLog.certificateDueDate = this.meterForm.value.certDueDate;
        }
        this.prestartDataService.setData(data);
        this.router.navigate(['/notes'], { skipLocationChange: false });
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
