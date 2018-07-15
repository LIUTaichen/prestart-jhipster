import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOffHireRequest } from 'app/shared/model/off-hire-request.model';

type EntityResponseType = HttpResponse<IOffHireRequest>;
type EntityArrayResponseType = HttpResponse<IOffHireRequest[]>;

@Injectable({ providedIn: 'root' })
export class OffHireRequestService {
    private resourceUrl = SERVER_API_URL + 'api/off-hire-requests';

    constructor(private http: HttpClient) {}

    create(offHireRequest: IOffHireRequest): Observable<EntityResponseType> {
        return this.http.post<IOffHireRequest>(this.resourceUrl, offHireRequest, { observe: 'response' });
    }

    update(offHireRequest: IOffHireRequest): Observable<EntityResponseType> {
        return this.http.put<IOffHireRequest>(this.resourceUrl, offHireRequest, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOffHireRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOffHireRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
