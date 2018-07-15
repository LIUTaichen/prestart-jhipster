/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckDeleteDialogComponent } from 'app/entities/prestart-check/prestart-check-delete-dialog.component';
import { PrestartCheckService } from 'app/entities/prestart-check/prestart-check.service';

describe('Component Tests', () => {
    describe('PrestartCheck Management Delete Component', () => {
        let comp: PrestartCheckDeleteDialogComponent;
        let fixture: ComponentFixture<PrestartCheckDeleteDialogComponent>;
        let service: PrestartCheckService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckDeleteDialogComponent]
            })
                .overrideTemplate(PrestartCheckDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckService);
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
