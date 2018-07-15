import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompetency } from 'app/shared/model/competency.model';
import { CompetencyService } from './competency.service';

@Component({
    selector: 'jhi-competency-delete-dialog',
    templateUrl: './competency-delete-dialog.component.html'
})
export class CompetencyDeleteDialogComponent {
    competency: ICompetency;

    constructor(private competencyService: CompetencyService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.competencyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'competencyListModification',
                content: 'Deleted an competency'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-competency-delete-popup',
    template: ''
})
export class CompetencyDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ competency }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompetencyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.competency = competency;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
