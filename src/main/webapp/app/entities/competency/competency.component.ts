import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompetency } from 'app/shared/model/competency.model';
import { Principal } from 'app/core';
import { CompetencyService } from './competency.service';

@Component({
    selector: 'jhi-competency',
    templateUrl: './competency.component.html'
})
export class CompetencyComponent implements OnInit, OnDestroy {
    competencies: ICompetency[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private competencyService: CompetencyService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.competencyService.query().subscribe(
            (res: HttpResponse<ICompetency[]>) => {
                this.competencies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompetencies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompetency) {
        return item.id;
    }

    registerChangeInCompetencies() {
        this.eventSubscriber = this.eventManager.subscribe('competencyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
