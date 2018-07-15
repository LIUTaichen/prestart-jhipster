import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';

type EntityResponseType = HttpResponse<INiggleSnapshot>;
type EntityArrayResponseType = HttpResponse<INiggleSnapshot[]>;

@Injectable({ providedIn: 'root' })
export class NiggleSnapshotService {
    private resourceUrl = SERVER_API_URL + 'api/niggle-snapshots';

    constructor(private http: HttpClient) {}

    create(niggleSnapshot: INiggleSnapshot): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(niggleSnapshot);
        return this.http
            .post<INiggleSnapshot>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(niggleSnapshot: INiggleSnapshot): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(niggleSnapshot);
        return this.http
            .put<INiggleSnapshot>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<INiggleSnapshot>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<INiggleSnapshot[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(niggleSnapshot: INiggleSnapshot): INiggleSnapshot {
        const copy: INiggleSnapshot = Object.assign({}, niggleSnapshot, {
            date: niggleSnapshot.date != null && niggleSnapshot.date.isValid() ? niggleSnapshot.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((niggleSnapshot: INiggleSnapshot) => {
            niggleSnapshot.date = niggleSnapshot.date != null ? moment(niggleSnapshot.date) : null;
        });
        return res;
    }
}
