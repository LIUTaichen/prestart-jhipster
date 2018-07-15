import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrestartCheck } from 'app/shared/model/prestart-check.model';
import { PrestartCheckService } from './prestart-check.service';

@Component({
    selector: 'jhi-prestart-check-delete-dialog',
    templateUrl: './prestart-check-delete-dialog.component.html'
})
export class PrestartCheckDeleteDialogComponent {
    prestartCheck: IPrestartCheck;

    constructor(
        private prestartCheckService: PrestartCheckService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestartCheckService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prestartCheckListModification',
                content: 'Deleted an prestartCheck'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestart-check-delete-popup',
    template: ''
})
export class PrestartCheckDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheck }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrestartCheckDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prestartCheck = prestartCheck;
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
