import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INiggle } from 'app/shared/model/niggle.model';

type EntityResponseType = HttpResponse<INiggle>;
type EntityArrayResponseType = HttpResponse<INiggle[]>;

@Injectable({ providedIn: 'root' })
export class NiggleService {
    private resourceUrl = SERVER_API_URL + 'api/niggles';

    constructor(private http: HttpClient) {}

    create(niggle: INiggle): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(niggle);
        return this.http
            .post<INiggle>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(niggle: INiggle): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(niggle);
        return this.http
            .put<INiggle>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INiggle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INiggle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(niggle: INiggle): INiggle {
        const copy: INiggle = Object.assign({}, niggle, {
            dateOpened: niggle.dateOpened != null && niggle.dateOpened.isValid() ? niggle.dateOpened.toJSON() : null,
            dateClosed: niggle.dateClosed != null && niggle.dateClosed.isValid() ? niggle.dateClosed.toJSON() : null,
            dateCompleted: niggle.dateCompleted != null && niggle.dateCompleted.isValid() ? niggle.dateCompleted.toJSON() : null,
            eta: niggle.eta != null && niggle.eta.isValid() ? niggle.eta.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateOpened = res.body.dateOpened != null ? moment(res.body.dateOpened) : null;
        res.body.dateClosed = res.body.dateClosed != null ? moment(res.body.dateClosed) : null;
        res.body.dateCompleted = res.body.dateCompleted != null ? moment(res.body.dateCompleted) : null;
        res.body.eta = res.body.eta != null ? moment(res.body.eta) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((niggle: INiggle) => {
            niggle.dateOpened = niggle.dateOpened != null ? moment(niggle.dateOpened) : null;
            niggle.dateClosed = niggle.dateClosed != null ? moment(niggle.dateClosed) : null;
            niggle.dateCompleted = niggle.dateCompleted != null ? moment(niggle.dateCompleted) : null;
            niggle.eta = niggle.eta != null ? moment(niggle.eta) : null;
        });
        return res;
    }
}
