import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';
import { PrestartCheckResponseService } from './prestart-check-response.service';

@Component({
    selector: 'jhi-prestart-check-response-delete-dialog',
    templateUrl: './prestart-check-response-delete-dialog.component.html'
})
export class PrestartCheckResponseDeleteDialogComponent {
    prestartCheckResponse: IPrestartCheckResponse;

    constructor(
        private prestartCheckResponseService: PrestartCheckResponseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestartCheckResponseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prestartCheckResponseListModification',
                content: 'Deleted an prestartCheckResponse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestart-check-response-delete-popup',
    template: ''
})
export class PrestartCheckResponseDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheckResponse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrestartCheckResponseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prestartCheckResponse = prestartCheckResponse;
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
