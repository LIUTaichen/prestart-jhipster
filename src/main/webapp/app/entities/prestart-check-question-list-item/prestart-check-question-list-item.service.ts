import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';

type EntityResponseType = HttpResponse<IPrestartCheckQuestionListItem>;
type EntityArrayResponseType = HttpResponse<IPrestartCheckQuestionListItem[]>;

@Injectable({ providedIn: 'root' })
export class PrestartCheckQuestionListItemService {
    private resourceUrl = SERVER_API_URL + 'api/prestart-check-question-list-items';

    constructor(private http: HttpClient) {}

    create(prestartCheckQuestionListItem: IPrestartCheckQuestionListItem): Observable<EntityResponseType> {
        return this.http.post<IPrestartCheckQuestionListItem>(this.resourceUrl, prestartCheckQuestionListItem, { observe: 'response' });
    }

    update(prestartCheckQuestionListItem: IPrestartCheckQuestionListItem): Observable<EntityResponseType> {
        return this.http.put<IPrestartCheckQuestionListItem>(this.resourceUrl, prestartCheckQuestionListItem, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPrestartCheckQuestionListItem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPrestartCheckQuestionListItem[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
