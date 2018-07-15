import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPeople } from 'app/shared/model/people.model';
import { PeopleService } from './people.service';

@Component({
    selector: 'jhi-people-update',
    templateUrl: './people-update.component.html'
})
export class PeopleUpdateComponent implements OnInit {
    private _people: IPeople;
    isSaving: boolean;

    constructor(private peopleService: PeopleService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ people }) => {
            this.people = people;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.people.id !== undefined) {
            this.subscribeToSaveResponse(this.peopleService.update(this.people));
        } else {
            this.subscribeToSaveResponse(this.peopleService.create(this.people));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPeople>>) {
        result.subscribe((res: HttpResponse<IPeople>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get people() {
        return this._people;
    }

    set people(people: IPeople) {
        this._people = people;
    }
}
