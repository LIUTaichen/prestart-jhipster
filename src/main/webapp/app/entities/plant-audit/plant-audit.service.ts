import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPlantAudit } from 'app/shared/model/plant-audit.model';

type EntityResponseType = HttpResponse<IPlantAudit>;
type EntityArrayResponseType = HttpResponse<IPlantAudit[]>;

@Injectable({ providedIn: 'root' })
export class PlantAuditService {
    private resourceUrl = SERVER_API_URL + 'api/plant-audits';

    constructor(private http: HttpClient) {}

    create(plantAudit: IPlantAudit): Observable<EntityResponseType> {
        return this.http.post<IPlantAudit>(this.resourceUrl, plantAudit, { observe: 'response' });
    }

    update(plantAudit: IPlantAudit): Observable<EntityResponseType> {
        return this.http.put<IPlantAudit>(this.resourceUrl, plantAudit, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPlantAudit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPlantAudit[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
