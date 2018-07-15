import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { INiggle } from 'app/shared/model/niggle.model';
import { NiggleService } from './niggle.service';
import { IPurchaseOrder } from 'app/shared/model/purchase-order.model';
import { PurchaseOrderService } from 'app/entities/purchase-order';
import { IPlant } from 'app/shared/model/plant.model';
import { PlantService } from 'app/entities/plant';
import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';
import { MaintenanceContractorService } from 'app/entities/maintenance-contractor';

@Component({
    selector: 'jhi-niggle-update',
    templateUrl: './niggle-update.component.html'
})
export class NiggleUpdateComponent implements OnInit {
    private _niggle: INiggle;
    isSaving: boolean;

    purchaseorders: IPurchaseOrder[];

    plants: IPlant[];

    maintenancecontractors: IMaintenanceContractor[];
    dateOpened: string;
    dateClosed: string;
    dateCompleted: string;
    eta: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private niggleService: NiggleService,
        private purchaseOrderService: PurchaseOrderService,
        private plantService: PlantService,
        private maintenanceContractorService: MaintenanceContractorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ niggle }) => {
            this.niggle = niggle;
        });
        this.purchaseOrderService.query({ filter: 'niggle-is-null' }).subscribe(
            (res: HttpResponse<IPurchaseOrder[]>) => {
                if (!this.niggle.purchaseOrder || !this.niggle.purchaseOrder.id) {
                    this.purchaseorders = res.body;
                } else {
                    this.purchaseOrderService.find(this.niggle.purchaseOrder.id).subscribe(
                        (subRes: HttpResponse<IPurchaseOrder>) => {
                            this.purchaseorders = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.plantService.query().subscribe(
            (res: HttpResponse<IPlant[]>) => {
                this.plants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.maintenanceContractorService.query().subscribe(
            (res: HttpResponse<IMaintenanceContractor[]>) => {
                this.maintenancecontractors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.niggle.dateOpened = moment(this.dateOpened, DATE_TIME_FORMAT);
        this.niggle.dateClosed = moment(this.dateClosed, DATE_TIME_FORMAT);
        this.niggle.dateCompleted = moment(this.dateCompleted, DATE_TIME_FORMAT);
        this.niggle.eta = moment(this.eta, DATE_TIME_FORMAT);
        if (this.niggle.id !== undefined) {
            this.subscribeToSaveResponse(this.niggleService.update(this.niggle));
        } else {
            this.subscribeToSaveResponse(this.niggleService.create(this.niggle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INiggle>>) {
        result.subscribe((res: HttpResponse<INiggle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPurchaseOrderById(index: number, item: IPurchaseOrder) {
        return item.id;
    }

    trackPlantById(index: number, item: IPlant) {
        return item.id;
    }

    trackMaintenanceContractorById(index: number, item: IMaintenanceContractor) {
        return item.id;
    }
    get niggle() {
        return this._niggle;
    }

    set niggle(niggle: INiggle) {
        this._niggle = niggle;
        this.dateOpened = moment(niggle.dateOpened).format(DATE_TIME_FORMAT);
        this.dateClosed = moment(niggle.dateClosed).format(DATE_TIME_FORMAT);
        this.dateCompleted = moment(niggle.dateCompleted).format(DATE_TIME_FORMAT);
        this.eta = moment(niggle.eta).format(DATE_TIME_FORMAT);
    }
}
