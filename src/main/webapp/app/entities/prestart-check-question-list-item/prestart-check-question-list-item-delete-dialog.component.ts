import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';
import { PrestartCheckQuestionListItemService } from './prestart-check-question-list-item.service';

@Component({
    selector: 'jhi-prestart-check-question-list-item-delete-dialog',
    templateUrl: './prestart-check-question-list-item-delete-dialog.component.html'
})
export class PrestartCheckQuestionListItemDeleteDialogComponent {
    prestartCheckQuestionListItem: IPrestartCheckQuestionListItem;

    constructor(
        private prestartCheckQuestionListItemService: PrestartCheckQuestionListItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestartCheckQuestionListItemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prestartCheckQuestionListItemListModification',
                content: 'Deleted an prestartCheckQuestionListItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestart-check-question-list-item-delete-popup',
    template: ''
})
export class PrestartCheckQuestionListItemDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartCheckQuestionListItem }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrestartCheckQuestionListItemDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prestartCheckQuestionListItem = prestartCheckQuestionListItem;
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
