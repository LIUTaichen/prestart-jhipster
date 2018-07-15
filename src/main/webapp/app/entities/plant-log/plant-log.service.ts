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
            wofDueDate: plantLog.wofDueDate != null && plantLog.wofDueDate.isValid() ? plantLog.wofDueDate.toJSON() : null,
            cofDueDate: plantLog.cofDueDate != null && plantLog.cofDueDate.isValid() ? plantLog.cofDueDate.toJSON() : null,
            serviceDueDate: plantLog.serviceDueDate != null && plantLog.serviceDueDate.isValid() ? plantLog.serviceDueDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.wofDueDate = res.body.wofDueDate != null ? moment(res.body.wofDueDate) : null;
        res.body.cofDueDate = res.body.cofDueDate != null ? moment(res.body.cofDueDate) : null;
        res.body.serviceDueDate = res.body.serviceDueDate != null ? moment(res.body.serviceDueDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((plantLog: IPlantLog) => {
            plantLog.wofDueDate = plantLog.wofDueDate != null ? moment(plantLog.wofDueDate) : null;
            plantLog.cofDueDate = plantLog.cofDueDate != null ? moment(plantLog.cofDueDate) : null;
            plantLog.serviceDueDate = plantLog.serviceDueDate != null ? moment(plantLog.serviceDueDate) : null;
        });
        return res;
    }
}
