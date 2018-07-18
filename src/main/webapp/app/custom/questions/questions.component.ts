import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartQuestionService } from 'app/entities/prestart-question';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config';
import { PrestartCheckQuestionListItemService } from 'app/entities/prestart-check-question-list-item';
import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { IPrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';
import { PrestartQuestionOptionService } from 'app/entities/prestart-question-option';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

@Component({
    selector: 'jhi-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
    plant: IPlant;
    questionItems: Array<IPrestartCheckQuestionListItem>;
    selectedOptions: Array<PrestartQuestionOption>;
    constructor(
        private prestartDataService: PrestartDataService,
        private questionService: PrestartQuestionService,
        private prestartQuestionlistService: PrestartCheckQuestionListItemService,
        private prestartCheckConfigService: PrestartCheckConfigService,
        private optionService: PrestartQuestionOptionService
    ) {}

    ngOnInit() {
        this.plant = this.prestartDataService.plant;
        this.prestartQuestionlistService
            .query({
                'prestartCheckConfigId.equals': this.plant.category.prestartCheckConfig.id
            })
            .flatMap(response => {
                console.log('retrieving question list');
                console.log(response.body);
                this.questionItems = response.body.sort(this.questionItemSort);
                return this.optionService.query({
                    'prestartQuestionId.in': this.questionItems.map(questionItem => questionItem.id)
                });
            })
            .subscribe(optionsResponse => {
                console.log('receiving opstions');
                console.log(optionsResponse.body);
                const options: PrestartQuestionOption[] = optionsResponse.body;
                this.questionItems.map(item => {
                    const question = item.question;
                    question.options = options.filter(option => option.prestartQuestion.id === question.id);
                });
                this.selectedOptions = new Array<PrestartQuestionOption>(this.questionItems.length);
            });
        // .pipe(response => {
        //     console.log('retrieving question list');
        //     console.log(response.body);
        //     this.questionItems = response.body;
        // })
        // .subscribe();
    }

    questionItemSort(a: IPrestartCheckQuestionListItem, b: IPrestartCheckQuestionListItem) {
        return a.order - b.order;
    }
}
