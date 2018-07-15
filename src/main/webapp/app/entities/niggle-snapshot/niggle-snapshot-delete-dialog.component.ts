import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';
import { NiggleSnapshotService } from './niggle-snapshot.service';

@Component({
    selector: 'jhi-niggle-snapshot-delete-dialog',
    templateUrl: './niggle-snapshot-delete-dialog.component.html'
})
export class NiggleSnapshotDeleteDialogComponent {
    niggleSnapshot: INiggleSnapshot;

    constructor(
        private niggleSnapshotService: NiggleSnapshotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.niggleSnapshotService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'niggleSnapshotListModification',
                content: 'Deleted an niggleSnapshot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-niggle-snapshot-delete-popup',
    template: ''
})
export class NiggleSnapshotDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ niggleSnapshot }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NiggleSnapshotDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.niggleSnapshot = niggleSnapshot;
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
