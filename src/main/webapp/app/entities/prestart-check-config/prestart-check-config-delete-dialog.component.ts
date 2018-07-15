import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';
import { PrestartCheckConfigService } from './prestart-check-config.service';

@Component({
    selector: 'jhi-prestart-check-config-delete-dialog',
    templateUrl: './prestart-check-config-delete-dialog.component.html'
})
export class PrestartCheckConfigDeleteDialogComponent {
    prestartCheckConfig: IPrestartCheckConfig;

    constructor(
        private prestartCheckConfigService: PrestartCheckConfigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestartCheckConfigService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prestartCheckConfigListModification',
                content: 'Deleted an prestartCheckConfig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestart-check-config-delete-popup',
    template: ''
})
export class PrestartCheckConfigDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheckConfig }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrestartCheckConfigDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prestartCheckConfig = prestartCheckConfig;
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
