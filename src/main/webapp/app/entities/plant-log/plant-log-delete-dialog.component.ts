import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantLog } from 'app/shared/model/plant-log.model';
import { PlantLogService } from './plant-log.service';

@Component({
    selector: 'jhi-plant-log-delete-dialog',
    templateUrl: './plant-log-delete-dialog.component.html'
})
export class PlantLogDeleteDialogComponent {
    plantLog: IPlantLog;

    constructor(private plantLogService: PlantLogService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.plantLogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'plantLogListModification',
                content: 'Deleted an plantLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-plant-log-delete-popup',
    template: ''
})
export class PlantLogDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ plantLog }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PlantLogDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.plantLog = plantLog;
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
