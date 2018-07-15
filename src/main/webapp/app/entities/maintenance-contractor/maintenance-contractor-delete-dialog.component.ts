import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';
import { MaintenanceContractorService } from './maintenance-contractor.service';

@Component({
    selector: 'jhi-maintenance-contractor-delete-dialog',
    templateUrl: './maintenance-contractor-delete-dialog.component.html'
})
export class MaintenanceContractorDeleteDialogComponent {
    maintenanceContractor: IMaintenanceContractor;

    constructor(
        private maintenanceContractorService: MaintenanceContractorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.maintenanceContractorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'maintenanceContractorListModification',
                content: 'Deleted an maintenanceContractor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-maintenance-contractor-delete-popup',
    template: ''
})
export class MaintenanceContractorDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ maintenanceContractor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MaintenanceContractorDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.maintenanceContractor = maintenanceContractor;
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
