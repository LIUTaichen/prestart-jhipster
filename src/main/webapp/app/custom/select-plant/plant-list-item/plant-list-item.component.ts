import { Component, OnInit, Input } from '@angular/core';
import { IPlant } from 'app/shared/model/plant.model';

@Component({
    selector: 'jhi-plant-list-item',
    templateUrl: './plant-list-item.component.html',
    styleUrls: ['./plant-list-item.component.css']
})
export class PlantListItemComponent implements OnInit {
    @Input() plant: IPlant;

    constructor() {}

    ngOnInit() {}
}
