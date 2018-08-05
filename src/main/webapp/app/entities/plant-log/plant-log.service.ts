import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlantLog } from 'app/shared/model/plant-log.model';

type EntityResponseType = HttpResponse<IPlantLog>;
type EntityArrayResponseType = HttpResponse<IPlantLog[]>;

@Injectable({ providedIn: 'root' })
export class PlantLogService {
    private resourceUrl = SERVER_API_URL + 'api/plant-logs';

    constructor(private http: HttpClient) {}

    create(plantLog: IPlantLog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(plantLog);
        return this.http
            .post<IPlantLog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(plantLog: IPlantLog): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(plantLog);
        return this.http
            .put<IPlantLog>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPlantLog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPlantLog[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(plantLog: IPlantLog): IPlantLog {
        const copy: IPlantLog = Object.assign({}, plantLog, {
            certificateDueDate:
                plantLog.certificateDueDate != null && plantLog.certificateDueDate.isValid() ? plantLog.certificateDueDate.toJSON() : null,
            maintenanceDueDate:
                plantLog.maintenanceDueDate != null && plantLog.maintenanceDueDate.isValid() ? plantLog.maintenanceDueDate.toJSON() : null,
            registrationDueDate:
                plantLog.registrationDueDate != null && plantLog.registrationDueDate.isValid()
                    ? plantLog.registrationDueDate.toJSON()
                    : null,
            lastMaintenanceDate:
                plantLog.lastMaintenanceDate != null && plantLog.lastMaintenanceDate.isValid()
                    ? plantLog.lastMaintenanceDate.toJSON()
                    : null,
            lastMaintenanceAt:
                plantLog.lastMaintenanceAt != null && plantLog.lastMaintenanceAt.isValid() ? plantLog.lastMaintenanceAt.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.certificateDueDate = res.body.certificateDueDate != null ? moment(res.body.certificateDueDate) : null;
        res.body.maintenanceDueDate = res.body.maintenanceDueDate != null ? moment(res.body.maintenanceDueDate) : null;
        res.body.registrationDueDate = res.body.registrationDueDate != null ? moment(res.body.registrationDueDate) : null;
        res.body.lastMaintenanceDate = res.body.lastMaintenanceDate != null ? moment(res.body.lastMaintenanceDate) : null;
        res.body.lastMaintenanceAt = res.body.lastMaintenanceAt != null ? moment(res.body.lastMaintenanceAt) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((plantLog: IPlantLog) => {
            plantLog.certificateDueDate = plantLog.certificateDueDate != null ? moment(plantLog.certificateDueDate) : null;
            plantLog.maintenanceDueDate = plantLog.maintenanceDueDate != null ? moment(plantLog.maintenanceDueDate) : null;
            plantLog.registrationDueDate = plantLog.registrationDueDate != null ? moment(plantLog.registrationDueDate) : null;
            plantLog.lastMaintenanceDate = plantLog.lastMaintenanceDate != null ? moment(plantLog.lastMaintenanceDate) : null;
            plantLog.lastMaintenanceAt = plantLog.lastMaintenanceAt != null ? moment(plantLog.lastMaintenanceAt) : null;
        });
        return res;
    }
}
