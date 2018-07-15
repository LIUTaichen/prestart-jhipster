import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';
import { NiggleSnapshotService } from './niggle-snapshot.service';

@Component({
    selector: 'jhi-niggle-snapshot-update',
    templateUrl: './niggle-snapshot-update.component.html'
})
export class NiggleSnapshotUpdateComponent implements OnInit {
    private _niggleSnapshot: INiggleSnapshot;
    isSaving: boolean;
    dateDp: any;

    constructor(private niggleSnapshotService: NiggleSnapshotService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ niggleSnapshot }) => {
            this.niggleSnapshot = niggleSnapshot;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.niggleSnapshot.id !== undefined) {
            this.subscribeToSaveResponse(this.niggleSnapshotService.update(this.niggleSnapshot));
        } else {
            this.subscribeToSaveResponse(this.niggleSnapshotService.create(this.niggleSnapshot));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INiggleSnapshot>>) {
        result.subscribe((res: HttpResponse<INiggleSnapshot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get niggleSnapshot() {
        return this._niggleSnapshot;
    }

    set niggleSnapshot(niggleSnapshot: INiggleSnapshot) {
        this._niggleSnapshot = niggleSnapshot;
    }
}
