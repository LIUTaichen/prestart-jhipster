import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlantLog } from 'app/shared/model/plant-log.model';

@Component({
    selector: 'jhi-plant-log-detail',
    templateUrl: './plant-log-detail.component.html'
})
export class PlantLogDetailComponent implements OnInit {
    plantLog: IPlantLog;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plantLog }) => {
            this.plantLog = plantLog;
        });
    }

    previousState() {
        window.history.back();
    }
}
