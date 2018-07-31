import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantAudit } from 'app/shared/model/plant-audit.model';
import { PlantAuditService } from './plant-audit.service';

@Component({
    selector: 'jhi-plant-audit-delete-dialog',
    templateUrl: './plant-audit-delete-dialog.component.html'
})
export class PlantAuditDeleteDialogComponent {
    plantAudit: IPlantAudit;

    constructor(private plantAuditService: PlantAuditService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.plantAuditService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plantAuditListModification',
                content: 'Deleted an plantAudit'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plant-audit-delete-popup',
    template: ''
})
export class PlantAuditDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plantAudit }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlantAuditDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.plantAudit = plantAudit;
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
