import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';

@Component({
    selector: 'jhi-niggle-snapshot-detail',
    templateUrl: './niggle-snapshot-detail.component.html'
})
export class NiggleSnapshotDetailComponent implements OnInit {
    niggleSnapshot: INiggleSnapshot;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ niggleSnapshot }) => {
            this.niggleSnapshot = niggleSnapshot;
        });
    }

    previousState() {
        window.history.back();
    }
}
