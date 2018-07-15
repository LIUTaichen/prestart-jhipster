/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestartTestModule } from '../../../test.module';
import { OffHireRequestDeleteDialogComponent } from 'app/entities/off-hire-request/off-hire-request-delete-dialog.component';
import { OffHireRequestService } from 'app/entities/off-hire-request/off-hire-request.service';

describe('Component Tests', () => {
    describe('OffHireRequest Management Delete Component', () => {
        let comp: OffHireRequestDeleteDialogComponent;
        let fixture: ComponentFixture<OffHireRequestDeleteDialogComponent>;
        let service: OffHireRequestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [OffHireRequestDeleteDialogComponent]
            })
                .overrideTemplate(OffHireRequestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OffHireRequestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffHireRequestService);
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
