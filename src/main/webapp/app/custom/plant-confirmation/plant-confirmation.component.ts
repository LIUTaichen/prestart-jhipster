import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { IPlant } from '../../shared/model/plant.model';

@Component({
    selector: 'jhi-plant-confirmation',
    templateUrl: './plant-confirmation.component.html',
    styleUrls: ['./plant-confirmation.component.css']
})
export class PlantConfirmationComponent implements OnInit {
    plant: IPlant;

    constructor(private prestartDataService: PrestartDataService) {}

    ngOnInit() {
        this.plant = this.prestartDataService.plant;
    }
}
