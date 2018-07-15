import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOffHireRequest } from 'app/shared/model/off-hire-request.model';

@Component({
    selector: 'jhi-off-hire-request-detail',
    templateUrl: './off-hire-request-detail.component.html'
})
export class OffHireRequestDetailComponent implements OnInit {
    offHireRequest: IOffHireRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ offHireRequest }) => {
            this.offHireRequest = offHireRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
