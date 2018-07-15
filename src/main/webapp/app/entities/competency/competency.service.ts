import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompetency } from 'app/shared/model/competency.model';

type EntityResponseType = HttpResponse<ICompetency>;
type EntityArrayResponseType = HttpResponse<ICompetency[]>;

@Injectable({ providedIn: 'root' })
export class CompetencyService {
    private resourceUrl = SERVER_API_URL + 'api/competencies';

    constructor(private http: HttpClient) {}

    create(competency: ICompetency): Observable<EntityResponseType> {
        return this.http.post<ICompetency>(this.resourceUrl, competency, { observe: 'response' });
    }

    update(competency: ICompetency): Observable<EntityResponseType> {
        return this.http.put<ICompetency>(this.resourceUrl, competency, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompetency>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompetency[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
