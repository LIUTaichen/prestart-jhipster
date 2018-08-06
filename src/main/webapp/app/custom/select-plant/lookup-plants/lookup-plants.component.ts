import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IPlant } from 'app/shared/model/plant.model';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { PlantService } from 'app/entities/plant';

@Component({
    selector: 'jhi-lookup-plants',
    templateUrl: './lookup-plants.component.html',
    styleUrls: ['./lookup-plants.component.css']
})
export class LookupPlantsComponent implements OnInit {
    queryControl: FormControl = new FormControl('');
    plants: IPlant[];
    @Output() selected = new EventEmitter<IPlant>();
    constructor(private plantService: PlantService) {}

    ngOnInit() {
        this.queryControl.valueChanges
            .filter(newVal => newVal)
            .debounceTime(400)
            .flatMap(newValue => {
                console.log(newValue);
                return this.plantService.query({
                    'fleetId.contains': newValue
                });
            })
            .subscribe(response => {
                this.plants = response.body;
            });
    }

    onPlantClicked(plant: IPlant) {
        this.selected.emit(plant);
    }
}
