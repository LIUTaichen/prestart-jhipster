import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INiggle } from 'app/shared/model/niggle.model';

@Component({
    selector: 'jhi-niggle-detail',
    templateUrl: './niggle-detail.component.html'
})
export class NiggleDetailComponent implements OnInit {
    niggle: INiggle;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ niggle }) => {
            this.niggle = niggle;
        });
    }

    previousState() {
        window.history.back();
    }
}
