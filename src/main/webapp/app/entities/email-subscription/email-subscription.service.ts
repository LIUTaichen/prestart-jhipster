import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmailSubscription } from 'app/shared/model/email-subscription.model';

type EntityResponseType = HttpResponse<IEmailSubscription>;
type EntityArrayResponseType = HttpResponse<IEmailSubscription[]>;

@Injectable({ providedIn: 'root' })
export class EmailSubscriptionService {
    private resourceUrl = SERVER_API_URL + 'api/email-subscriptions';

    constructor(private http: HttpClient) {}

    create(emailSubscription: IEmailSubscription): Observable<EntityResponseType> {
        return this.http.post<IEmailSubscription>(this.resourceUrl, emailSubscription, { observe: 'response' });
    }

    update(emailSubscription: IEmailSubscription): Observable<EntityResponseType> {
        return this.http.put<IEmailSubscription>(this.resourceUrl, emailSubscription, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmailSubscription>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmailSubscription[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
