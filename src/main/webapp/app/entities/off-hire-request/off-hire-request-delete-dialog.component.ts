import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOffHireRequest } from 'app/shared/model/off-hire-request.model';
import { OffHireRequestService } from './off-hire-request.service';

@Component({
    selector: 'jhi-off-hire-request-delete-dialog',
    templateUrl: './off-hire-request-delete-dialog.component.html'
})
export class OffHireRequestDeleteDialogComponent {
    offHireRequest: IOffHireRequest;

    constructor(
        private offHireRequestService: OffHireRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.offHireRequestService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'offHireRequestListModification',
                content: 'Deleted an offHireRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-off-hire-request-delete-popup',
    template: ''
})
export class OffHireRequestDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ offHireRequest }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OffHireRequestDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.offHireRequest = offHireRequest;
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
