import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

@Component({
    selector: 'jhi-prestart-question-option-detail',
    templateUrl: './prestart-question-option-detail.component.html'
})
export class PrestartQuestionOptionDetailComponent implements OnInit {
    prestartQuestionOption: IPrestartQuestionOption;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartQuestionOption }) => {
            this.prestartQuestionOption = prestartQuestionOption;
        });
    }

    previousState() {
        window.history.back();
    }
}
