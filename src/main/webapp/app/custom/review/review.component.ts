import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { IPlant } from 'app/shared/model/plant.model';
import { Data } from '../prestart-data/prestart-data.service';

@Component({
    selector: 'jhi-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    data: Data;

    constructor(private prestartDataService: PrestartDataService) {}
    ngOnInit() {
        this.data = this.prestartDataService.data;
    }
}
