import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { IPlant } from 'app/shared/model/plant.model';

@Component({
    selector: 'jhi-meter-reading',
    templateUrl: './meter-reading.component.html',
    styleUrls: ['./meter-reading.component.css']
})
export class MeterReadingComponent implements OnInit {
    plant: IPlant;
    meterReading: Number;
    constructor(private prestartDataService: PrestartDataService) {}

    ngOnInit() {
        this.plant = this.prestartDataService.plant;
        this.meterReading = this.plant.meterReading;
    }
}
