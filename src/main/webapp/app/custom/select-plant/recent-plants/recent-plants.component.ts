import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IPlant } from '../../../shared/model/plant.model';
import { RecentPlantsService } from './recent-plants.service';

@Component({
    selector: 'jhi-recent-plants',
    templateUrl: './recent-plants.component.html',
    styleUrls: ['./recent-plants.component.css']
})
export class RecentPlantsComponent implements OnInit {
    plants: Array<IPlant>;
    @Output() selected = new EventEmitter<IPlant>();
    constructor(private recentPlantsService: RecentPlantsService) {}

    ngOnInit() {
        this.plants = this.recentPlantsService.getRecentPlants();
    }

    onPlantClicked(plant: IPlant) {
        this.selected.emit(plant);
    }
}
