import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { IPlant } from 'app/shared/model/plant.model';
import { Data } from '../prestart-data/prestart-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    data: Data;

    constructor(private prestartDataService: PrestartDataService, private router: Router) {}
    ngOnInit() {
        if (this.prestartDataService.data && this.prestartDataService.data.plantLog && this.prestartDataService.data.plantLog.plant) {
            this.data = this.prestartDataService.data;
        } else {
            console.log('data empty, ', this.prestartDataService.data);
            console.log('navigating back to home ');
            this.router.navigate(['/'], { skipLocationChange: false });
        }
    }
}
