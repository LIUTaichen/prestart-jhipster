import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { IPlant } from '../../shared/model/plant.model';
import { Router } from '@angular/router';
import { PlantService } from 'app/entities/plant';

@Component({
    selector: 'jhi-plant-confirmation',
    templateUrl: './plant-confirmation.component.html',
    styleUrls: ['./plant-confirmation.component.css']
})
export class PlantConfirmationComponent implements OnInit {
    plant: IPlant;

    constructor(private prestartDataService: PrestartDataService, private router: Router, private plantService: PlantService) {}

    ngOnInit() {
        if (this.prestartDataService.data.plantIdToConfirm) {
            this.plantService.find(this.prestartDataService.data.plantIdToConfirm).subscribe(
                response => {
                    this.plant = response.body;
                },
                error => {
                    console.error('unable to find plant with id ', this.prestartDataService.data.plantIdToConfirm);
                }
            );
        } else {
            console.error('plant Id to confirm is not found');
            this.router.navigate(['/select-plant'], { skipLocationChange: true });
        }
    }

    onSubmit() {
        this.prestartDataService.setPlant(this.plant);
        this.router.navigate(['/questions'], { skipLocationChange: true });
    }
}
