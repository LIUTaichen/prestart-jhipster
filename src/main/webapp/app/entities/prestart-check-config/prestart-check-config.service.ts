import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';

type EntityResponseType = HttpResponse<IPrestartCheckConfig>;
type EntityArrayResponseType = HttpResponse<IPrestartCheckConfig[]>;

@Injectable({ providedIn: 'root' })
export class PrestartCheckConfigService {
    private resourceUrl = SERVER_API_URL + 'api/prestart-check-configs';

    constructor(private http: HttpClient) {}

    create(prestartCheckConfig: IPrestartCheckConfig): Observable<EntityResponseType> {
        return this.http.post<IPrestartCheckConfig>(this.resourceUrl, prestartCheckConfig, { observe: 'response' });
    }

    update(prestartCheckConfig: IPrestartCheckConfig): Observable<EntityResponseType> {
        return this.http.put<IPrestartCheckConfig>(this.resourceUrl, prestartCheckConfig, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrestartCheckConfig>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrestartCheckConfig[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
