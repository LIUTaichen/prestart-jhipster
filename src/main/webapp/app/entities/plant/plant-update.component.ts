import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPlant } from 'app/shared/model/plant.model';
import { PlantService } from './plant.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';
import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';
import { MaintenanceContractorService } from 'app/entities/maintenance-contractor';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-plant-update',
    templateUrl: './plant-update.component.html'
})
export class PlantUpdateComponent implements OnInit {
    private _plant: IPlant;
    isSaving: boolean;

    locations: ILocation[];

    categories: ICategory[];

    companies: ICompany[];

    maintenancecontractors: IMaintenanceContractor[];

    projects: IProject[];
    purchaseDate: string;
    dateOfManufacture: string;
    maintenanceDueDate: string;
    lastMaintenanceDate: string;
    lastMaintenanceAt: string;
    certificateDueDate: string;
    registrationDueDate: string;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private plantService: PlantService,
        private locationService: LocationService,
        private categoryService: CategoryService,
        private companyService: CompanyService,
        private maintenanceContractorService: MaintenanceContractorService,
        private projectService: ProjectService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ plant }) => {
            this.plant = plant;
        });
        this.locationService.query({ filter: 'plant-is-null' }).subscribe(
            (res: HttpResponse<ILocation[]>) => {
                if (!this.plant.location || !this.plant.location.id) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.plant.location.id).subscribe(
                        (subRes: HttpResponse<ILocation>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.categoryService.query().subscribe(
            (res: HttpResponse<ICategory[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompany[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.maintenanceContractorService.query().subscribe(
            (res: HttpResponse<IMaintenanceContractor[]>) => {
                this.maintenancecontractors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.projectService.query().subscribe(
            (res: HttpResponse<IProject[]>) => {
                this.projects = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.plant.purchaseDate = moment(this.purchaseDate, DATE_TIME_FORMAT);
        this.plant.dateOfManufacture = moment(this.dateOfManufacture, DATE_TIME_FORMAT);
        this.plant.maintenanceDueDate = moment(this.maintenanceDueDate, DATE_TIME_FORMAT);
        this.plant.lastMaintenanceDate = moment(this.lastMaintenanceDate, DATE_TIME_FORMAT);
        this.plant.lastMaintenanceAt = moment(this.lastMaintenanceAt, DATE_TIME_FORMAT);
        this.plant.certificateDueDate = moment(this.certificateDueDate, DATE_TIME_FORMAT);
        this.plant.registrationDueDate = moment(this.registrationDueDate, DATE_TIME_FORMAT);
        if (this.plant.id !== undefined) {
            this.subscribeToSaveResponse(this.plantService.update(this.plant));
        } else {
            this.subscribeToSaveResponse(this.plantService.create(this.plant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPlant>>) {
        result.subscribe((res: HttpResponse<IPlant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackLocationById(index: number, item: ILocation) {
        return item.id;
    }

    trackCategoryById(index: number, item: ICategory) {
        return item.id;
    }

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }

    trackMaintenanceContractorById(index: number, item: IMaintenanceContractor) {
        return item.id;
    }

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }
    get plant() {
        return this._plant;
    }

    set plant(plant: IPlant) {
        this._plant = plant;
        this.purchaseDate = moment(plant.purchaseDate).format(DATE_TIME_FORMAT);
        this.dateOfManufacture = moment(plant.dateOfManufacture).format(DATE_TIME_FORMAT);
        this.maintenanceDueDate = moment(plant.maintenanceDueDate).format(DATE_TIME_FORMAT);
        this.lastMaintenanceDate = moment(plant.lastMaintenanceDate).format(DATE_TIME_FORMAT);
        this.lastMaintenanceAt = moment(plant.lastMaintenanceAt).format(DATE_TIME_FORMAT);
        this.certificateDueDate = moment(plant.certificateDueDate).format(DATE_TIME_FORMAT);
        this.registrationDueDate = moment(plant.registrationDueDate).format(DATE_TIME_FORMAT);
    }
}
