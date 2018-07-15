import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';

type EntityResponseType = HttpResponse<IMaintenanceContractor>;
type EntityArrayResponseType = HttpResponse<IMaintenanceContractor[]>;

@Injectable({ providedIn: 'root' })
export class MaintenanceContractorService {
    private resourceUrl = SERVER_API_URL + 'api/maintenance-contractors';

    constructor(private http: HttpClient) {}

    create(maintenanceContractor: IMaintenanceContractor): Observable<EntityResponseType> {
        return this.http.post<IMaintenanceContractor>(this.resourceUrl, maintenanceContractor, { observe: 'response' });
    }

    update(maintenanceContractor: IMaintenanceContractor): Observable<EntityResponseType> {
        return this.http.put<IMaintenanceContractor>(this.resourceUrl, maintenanceContractor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMaintenanceContractor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMaintenanceContractor[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
