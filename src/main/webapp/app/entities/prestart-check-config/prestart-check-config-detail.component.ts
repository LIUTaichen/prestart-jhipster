import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';

@Component({
    selector: 'jhi-prestart-check-config-detail',
    templateUrl: './prestart-check-config-detail.component.html'
})
export class PrestartCheckConfigDetailComponent implements OnInit {
    prestartCheckConfig: IPrestartCheckConfig;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheckConfig }) => {
            this.prestartCheckConfig = prestartCheckConfig;
        });
    }

    previousState() {
        window.history.back();
    }
}
