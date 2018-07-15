import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';

@Component({
    selector: 'jhi-maintenance-contractor-detail',
    templateUrl: './maintenance-contractor-detail.component.html'
})
export class MaintenanceContractorDetailComponent implements OnInit {
    maintenanceContractor: IMaintenanceContractor;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ maintenanceContractor }) => {
            this.maintenanceContractor = maintenanceContractor;
        });
    }

    previousState() {
        window.history.back();
    }
}
