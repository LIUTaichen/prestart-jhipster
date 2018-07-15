import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';
import { ICompetency } from 'app/shared/model/competency.model';
import { CompetencyService } from 'app/entities/competency';
import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config';

@Component({
    selector: 'jhi-category-update',
    templateUrl: './category-update.component.html'
})
export class CategoryUpdateComponent implements OnInit {
    private _category: ICategory;
    isSaving: boolean;

    competencies: ICompetency[];

    prestartcheckconfigs: IPrestartCheckConfig[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private categoryService: CategoryService,
        private competencyService: CompetencyService,
        private prestartCheckConfigService: PrestartCheckConfigService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ category }) => {
            this.category = category;
        });
        this.competencyService.query().subscribe(
            (res: HttpResponse<ICompetency[]>) => {
                this.competencies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.prestartCheckConfigService.query().subscribe(
            (res: HttpResponse<IPrestartCheckConfig[]>) => {
                this.prestartcheckconfigs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(this.categoryService.update(this.category));
        } else {
            this.subscribeToSaveResponse(this.categoryService.create(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICategory>>) {
        result.subscribe((res: HttpResponse<ICategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompetencyById(index: number, item: ICompetency) {
        return item.id;
    }

    trackPrestartCheckConfigById(index: number, item: IPrestartCheckConfig) {
        return item.id;
    }
    get category() {
        return this._category;
    }

    set category(category: ICategory) {
        this._category = category;
    }
}
