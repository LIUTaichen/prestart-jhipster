import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlantAudit } from 'app/shared/model/plant-audit.model';

@Component({
    selector: 'jhi-plant-audit-detail',
    templateUrl: './plant-audit-detail.component.html'
})
export class PlantAuditDetailComponent implements OnInit {
    plantAudit: IPlantAudit;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plantAudit }) => {
            this.plantAudit = plantAudit;
        });
    }

    previousState() {
        window.history.back();
    }
}
