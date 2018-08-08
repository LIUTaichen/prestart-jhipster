import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class LookupPlantsComponent implements OnInit, AfterViewInit {
    queryControl: FormControl = new FormControl('');
    isSearching = false;
    plants: IPlant[];
    @ViewChild('query') queryInput: ElementRef;
    @Output() selected = new EventEmitter<IPlant>();
    constructor(private plantService: PlantService) {}

    ngOnInit() {}

    onPlantClicked(plant: IPlant) {
        this.selected.emit(plant);
    }

    ngAfterViewInit() {}

    onEnter() {
        const newValue = this.queryControl.value;
        if (!newValue || newValue.length < 2) {
            return;
        }
        this.queryInput.nativeElement.blur();
        this.isSearching = true;
        this.plantService
            .query({
                'fleetId.contains': this.queryControl.value
            })
            .subscribe(response => {
                this.plants = response.body;
                this.isSearching = false;
            });
    }
}
