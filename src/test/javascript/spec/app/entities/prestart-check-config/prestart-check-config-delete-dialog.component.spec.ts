/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckConfigDeleteDialogComponent } from 'app/entities/prestart-check-config/prestart-check-config-delete-dialog.component';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config/prestart-check-config.service';

describe('Component Tests', () => {
    describe('PrestartCheckConfig Management Delete Component', () => {
        let comp: PrestartCheckConfigDeleteDialogComponent;
        let fixture: ComponentFixture<PrestartCheckConfigDeleteDialogComponent>;
        let service: PrestartCheckConfigService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckConfigDeleteDialogComponent]
            })
                .overrideTemplate(PrestartCheckConfigDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckConfigDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckConfigService);
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
