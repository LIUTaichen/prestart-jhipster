import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';

@Component({
    selector: 'jhi-prestart-check-question-list-item-detail',
    templateUrl: './prestart-check-question-list-item-detail.component.html'
})
export class PrestartCheckQuestionListItemDetailComponent implements OnInit {
    prestartCheckQuestionListItem: IPrestartCheckQuestionListItem;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheckQuestionListItem }) => {
            this.prestartCheckQuestionListItem = prestartCheckQuestionListItem;
        });
    }

    previousState() {
        window.history.back();
    }
}
