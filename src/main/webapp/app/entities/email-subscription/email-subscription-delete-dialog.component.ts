import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmailSubscription } from 'app/shared/model/email-subscription.model';
import { EmailSubscriptionService } from './email-subscription.service';

@Component({
    selector: 'jhi-email-subscription-delete-dialog',
    templateUrl: './email-subscription-delete-dialog.component.html'
})
export class EmailSubscriptionDeleteDialogComponent {
    emailSubscription: IEmailSubscription;

    constructor(
        private emailSubscriptionService: EmailSubscriptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.emailSubscriptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'emailSubscriptionListModification',
                content: 'Deleted an emailSubscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-email-subscription-delete-popup',
    template: ''
})
export class EmailSubscriptionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ emailSubscription }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmailSubscriptionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.emailSubscription = emailSubscription;
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
