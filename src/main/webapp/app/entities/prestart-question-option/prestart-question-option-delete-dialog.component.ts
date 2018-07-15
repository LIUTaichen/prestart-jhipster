import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';
import { PrestartQuestionOptionService } from './prestart-question-option.service';

@Component({
    selector: 'jhi-prestart-question-option-delete-dialog',
    templateUrl: './prestart-question-option-delete-dialog.component.html'
})
export class PrestartQuestionOptionDeleteDialogComponent {
    prestartQuestionOption: IPrestartQuestionOption;

    constructor(
        private prestartQuestionOptionService: PrestartQuestionOptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestartQuestionOptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prestartQuestionOptionListModification',
                content: 'Deleted an prestartQuestionOption'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestart-question-option-delete-popup',
    template: ''
})
export class PrestartQuestionOptionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestartQuestionOption }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrestartQuestionOptionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prestartQuestionOption = prestartQuestionOption;
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
