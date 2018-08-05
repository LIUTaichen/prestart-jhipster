import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlant } from 'app/shared/model/plant.model';

type EntityResponseType = HttpResponse<IPlant>;
type EntityArrayResponseType = HttpResponse<IPlant[]>;

@Injectable({ providedIn: 'root' })
export class PlantService {
    private resourceUrl = SERVER_API_URL + 'api/plants';

    constructor(private http: HttpClient) {}

    create(plant: IPlant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(plant);
        return this.http
            .post<IPlant>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(plant: IPlant): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(plant);
        return this.http
            .put<IPlant>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPlant>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPlant[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(plant: IPlant): IPlant {
        const copy: IPlant = Object.assign({}, plant, {
            purchaseDate: plant.purchaseDate != null && plant.purchaseDate.isValid() ? plant.purchaseDate.toJSON() : null,
            dateOfManufacture:
                plant.dateOfManufacture != null && plant.dateOfManufacture.isValid() ? plant.dateOfManufacture.toJSON() : null,
            maintenanceDueDate:
                plant.maintenanceDueDate != null && plant.maintenanceDueDate.isValid() ? plant.maintenanceDueDate.toJSON() : null,
            lastMaintenanceDate:
                plant.lastMaintenanceDate != null && plant.lastMaintenanceDate.isValid() ? plant.lastMaintenanceDate.toJSON() : null,
            lastMaintenanceAt:
                plant.lastMaintenanceAt != null && plant.lastMaintenanceAt.isValid() ? plant.lastMaintenanceAt.toJSON() : null,
            certificateDueDate:
                plant.certificateDueDate != null && plant.certificateDueDate.isValid() ? plant.certificateDueDate.toJSON() : null,
            registrationDueDate:
                plant.registrationDueDate != null && plant.registrationDueDate.isValid() ? plant.registrationDueDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.purchaseDate = res.body.purchaseDate != null ? moment(res.body.purchaseDate) : null;
        res.body.dateOfManufacture = res.body.dateOfManufacture != null ? moment(res.body.dateOfManufacture) : null;
        res.body.maintenanceDueDate = res.body.maintenanceDueDate != null ? moment(res.body.maintenanceDueDate) : null;
        res.body.lastMaintenanceDate = res.body.lastMaintenanceDate != null ? moment(res.body.lastMaintenanceDate) : null;
        res.body.lastMaintenanceAt = res.body.lastMaintenanceAt != null ? moment(res.body.lastMaintenanceAt) : null;
        res.body.certificateDueDate = res.body.certificateDueDate != null ? moment(res.body.certificateDueDate) : null;
        res.body.registrationDueDate = res.body.registrationDueDate != null ? moment(res.body.registrationDueDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((plant: IPlant) => {
            plant.purchaseDate = plant.purchaseDate != null ? moment(plant.purchaseDate) : null;
            plant.dateOfManufacture = plant.dateOfManufacture != null ? moment(plant.dateOfManufacture) : null;
            plant.maintenanceDueDate = plant.maintenanceDueDate != null ? moment(plant.maintenanceDueDate) : null;
            plant.lastMaintenanceDate = plant.lastMaintenanceDate != null ? moment(plant.lastMaintenanceDate) : null;
            plant.lastMaintenanceAt = plant.lastMaintenanceAt != null ? moment(plant.lastMaintenanceAt) : null;
            plant.certificateDueDate = plant.certificateDueDate != null ? moment(plant.certificateDueDate) : null;
            plant.registrationDueDate = plant.registrationDueDate != null ? moment(plant.registrationDueDate) : null;
        });
        return res;
    }
}
