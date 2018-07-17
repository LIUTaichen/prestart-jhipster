import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartQuestionService } from 'app/entities/prestart-question';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config';
import { PrestartCheckQuestionListItemService } from 'app/entities/prestart-check-question-list-item';

@Component({
    selector: 'jhi-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
    plant: IPlant;
    constructor(
        private prestartDataService: PrestartDataService,
        private questionService: PrestartQuestionService,
        private prestartQuestionlistService: PrestartCheckQuestionListItemService,
        private prestartCheckConfigService: PrestartCheckConfigService
    ) {}

    ngOnInit() {
        this.plant = this.prestartDataService.plant;
        this.prestartQuestionlistService
            .query({
                'prestartCheckConfigId.equals': this.plant.category.prestartCheckConfig.id
            })
            .subscribe(response => {
                console.log('retrieving question list');
                console.log(response.body);
            });
    }
}
