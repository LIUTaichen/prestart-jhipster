/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestartTestModule } from '../../../test.module';
import { EmailSubscriptionDeleteDialogComponent } from 'app/entities/email-subscription/email-subscription-delete-dialog.component';
import { EmailSubscriptionService } from 'app/entities/email-subscription/email-subscription.service';

describe('Component Tests', () => {
    describe('EmailSubscription Management Delete Component', () => {
        let comp: EmailSubscriptionDeleteDialogComponent;
        let fixture: ComponentFixture<EmailSubscriptionDeleteDialogComponent>;
        let service: EmailSubscriptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [EmailSubscriptionDeleteDialogComponent]
            })
                .overrideTemplate(EmailSubscriptionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmailSubscriptionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailSubscriptionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
