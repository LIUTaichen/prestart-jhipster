import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrestartCheck } from 'app/shared/model/prestart-check.model';

type EntityResponseType = HttpResponse<IPrestartCheck>;
type EntityArrayResponseType = HttpResponse<IPrestartCheck[]>;

@Injectable({ providedIn: 'root' })
export class PrestartCheckService {
    private resourceUrl = SERVER_API_URL + 'api/prestart-checks';

    constructor(private http: HttpClient) {}

    create(prestartCheck: IPrestartCheck): Observable<EntityResponseType> {
        return this.http.post<IPrestartCheck>(this.resourceUrl, prestartCheck, { observe: 'response' });
    }

    update(prestartCheck: IPrestartCheck): Observable<EntityResponseType> {
        return this.http.put<IPrestartCheck>(this.resourceUrl, prestartCheck, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrestartCheck>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrestartCheck[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
