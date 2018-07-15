import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPeople } from 'app/shared/model/people.model';
import { Principal } from 'app/core';
import { PeopleService } from './people.service';

@Component({
    selector: 'jhi-people',
    templateUrl: './people.component.html'
})
export class PeopleComponent implements OnInit, OnDestroy {
    people: IPeople[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private peopleService: PeopleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.peopleService.query().subscribe(
            (res: HttpResponse<IPeople[]>) => {
                this.people = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPeople();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPeople) {
        return item.id;
    }

    registerChangeInPeople() {
        this.eventSubscriber = this.eventManager.subscribe('peopleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
