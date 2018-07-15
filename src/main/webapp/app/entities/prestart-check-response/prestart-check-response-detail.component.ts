import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';

@Component({
    selector: 'jhi-prestart-check-response-detail',
    templateUrl: './prestart-check-response-detail.component.html'
})
export class PrestartCheckResponseDetailComponent implements OnInit {
    prestartCheckResponse: IPrestartCheckResponse;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheckResponse }) => {
            this.prestartCheckResponse = prestartCheckResponse;
        });
    }

    previousState() {
        window.history.back();
    }
}
