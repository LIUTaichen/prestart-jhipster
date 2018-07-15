import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPrestartCheck } from 'app/shared/model/prestart-check.model';

@Component({
    selector: 'jhi-prestart-check-detail',
    templateUrl: './prestart-check-detail.component.html'
})
export class PrestartCheckDetailComponent implements OnInit {
    prestartCheck: IPrestartCheck;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheck }) => {
            this.prestartCheck = prestartCheck;
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
