import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { PrestartDataService } from '../prestart-data/prestart-data.service';
import { IPlant } from '../../shared/model/plant.model';
import { PrestartQuestionService } from 'app/entities/prestart-question';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config';
import { IPrestartQuestion } from 'app/shared/model/prestart-question.model';
import { PrestartQuestionOptionService } from 'app/entities/prestart-question-option';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
    plant: IPlant;
    questionsFormGroup: FormGroup;
    questionItems: Array<IPrestartQuestion>;
    isSettingUp = true;
    questions: AbstractControl;
    constructor(
        private prestartDataService: PrestartDataService,
        private questionService: PrestartQuestionService,
        private prestartCheckConfigService: PrestartCheckConfigService,
        private optionService: PrestartQuestionOptionService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.questionsFormGroup = this.formBuilder.group({
            questions: this.formBuilder.array([])
        });
        this.plant = this.prestartDataService.data.plant;
        console.log(this.plant.category.prestartCheckConfig);
        this.questionService
            .query({
                'prestartCheckConfigId.equals': this.plant.category.prestartCheckConfig.id
            })
            .flatMap(response => {
                this.questionItems = response.body.sort(this.questionItemSort);
                return this.optionService.query({
                    'prestartQuestionId.in': this.questionItems.map(questionItem => questionItem.id)
                });
            })
            .subscribe(optionsResponse => {
                const options: PrestartQuestionOption[] = optionsResponse.body;
                const questionsFormArray = this.questionsFormGroup.get('questions') as FormArray;
                this.questionItems.map(item => {
                    const question = item;
                    question.options = options.filter(option => option.prestartQuestion.id === question.id);
                    questionsFormArray.push(new FormControl('', [Validators.required]));
                });
                if (this.prestartDataService.data.chosenOptions) {
                    this.questionsFormGroup.get('questions').setValue(this.prestartDataService.data.chosenOptions);
                }
                this.questions = questionsFormArray;
                this.questionsFormGroup.valueChanges.subscribe(newVal => {
                    console.log(newVal);
                    this.saveResponse();
                });
                this.isSettingUp = false;
            });
    }

    questionItemSort(a: IPrestartQuestion, b: IPrestartQuestion) {
        return a.order - b.order;
    }

    saveResponse() {
        const data = this.prestartDataService.data;
        console.log('before save', data);
        data.chosenOptions = this.questionsFormGroup.get('questions').value;
        this.prestartDataService.setData(data);
        console.log('after save', data);
    }

    onSubmit() {
        this.router.navigate(['/meter-reading']);
    }
}
