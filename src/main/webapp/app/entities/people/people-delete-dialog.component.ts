import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPeople } from 'app/shared/model/people.model';
import { PeopleService } from './people.service';

@Component({
    selector: 'jhi-people-delete-dialog',
    templateUrl: './people-delete-dialog.component.html'
})
export class PeopleDeleteDialogComponent {
    people: IPeople;

    constructor(private peopleService: PeopleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.peopleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'peopleListModification',
                content: 'Deleted an people'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-people-delete-popup',
    template: ''
})
export class PeopleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ people }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PeopleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.people = people;
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
