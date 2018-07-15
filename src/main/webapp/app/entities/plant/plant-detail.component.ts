import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPlant } from 'app/shared/model/plant.model';

@Component({
    selector: 'jhi-plant-detail',
    templateUrl: './plant-detail.component.html'
})
export class PlantDetailComponent implements OnInit {
    plant: IPlant;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plant }) => {
            this.plant = plant;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
