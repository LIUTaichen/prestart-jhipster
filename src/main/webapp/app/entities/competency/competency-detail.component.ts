import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompetency } from 'app/shared/model/competency.model';

@Component({
    selector: 'jhi-competency-detail',
    templateUrl: './competency-detail.component.html'
})
export class CompetencyDetailComponent implements OnInit {
    competency: ICompetency;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ competency }) => {
            this.competency = competency;
        });
    }

    previousState() {
        window.history.back();
    }
}
