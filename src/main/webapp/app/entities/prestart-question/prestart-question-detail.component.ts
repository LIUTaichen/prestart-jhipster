import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';

@Component({
    selector: 'jhi-prestart-question-detail',
    templateUrl: './prestart-question-detail.component.html'
})
export class PrestartQuestionDetailComponent implements OnInit {
    prestartQuestion: IPrestartQuestion;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartQuestion }) => {
            this.prestartQuestion = prestartQuestion;
        });
    }

    previousState() {
        window.history.back();
    }
}
