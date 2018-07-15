import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILocation } from 'app/shared/model/location.model';

type EntityResponseType = HttpResponse<ILocation>;
type EntityArrayResponseType = HttpResponse<ILocation[]>;

@Injectable({ providedIn: 'root' })
export class LocationService {
    private resourceUrl = SERVER_API_URL + 'api/locations';

    constructor(private http: HttpClient) {}

    create(location: ILocation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(location);
        return this.http
            .post<ILocation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(location: ILocation): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(location);
        return this.http
            .put<ILocation>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ILocation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ILocation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(location: ILocation): ILocation {
        const copy: ILocation = Object.assign({}, location, {
            timestamp: location.timestamp != null && location.timestamp.isValid() ? location.timestamp.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.timestamp = res.body.timestamp != null ? moment(res.body.timestamp) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((location: ILocation) => {
            location.timestamp = location.timestamp != null ? moment(location.timestamp) : null;
        });
        return res;
    }
}
