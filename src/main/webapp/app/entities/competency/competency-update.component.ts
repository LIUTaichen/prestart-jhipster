import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICompetency } from 'app/shared/model/competency.model';
import { CompetencyService } from './competency.service';

@Component({
    selector: 'jhi-competency-update',
    templateUrl: './competency-update.component.html'
})
export class CompetencyUpdateComponent implements OnInit {
    private _competency: ICompetency;
    isSaving: boolean;

    constructor(private competencyService: CompetencyService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ competency }) => {
            this.competency = competency;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.competency.id !== undefined) {
            this.subscribeToSaveResponse(this.competencyService.update(this.competency));
        } else {
            this.subscribeToSaveResponse(this.competencyService.create(this.competency));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICompetency>>) {
        result.subscribe((res: HttpResponse<ICompetency>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get competency() {
        return this._competency;
    }

    set competency(competency: ICompetency) {
        this._competency = competency;
    }
}
