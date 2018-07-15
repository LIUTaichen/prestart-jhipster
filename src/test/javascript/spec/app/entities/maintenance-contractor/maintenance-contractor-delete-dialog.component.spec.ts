/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestartTestModule } from '../../../test.module';
import { MaintenanceContractorDeleteDialogComponent } from 'app/entities/maintenance-contractor/maintenance-contractor-delete-dialog.component';
import { MaintenanceContractorService } from 'app/entities/maintenance-contractor/maintenance-contractor.service';

describe('Component Tests', () => {
    describe('MaintenanceContractor Management Delete Component', () => {
        let comp: MaintenanceContractorDeleteDialogComponent;
        let fixture: ComponentFixture<MaintenanceContractorDeleteDialogComponent>;
        let service: MaintenanceContractorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [MaintenanceContractorDeleteDialogComponent]
            })
                .overrideTemplate(MaintenanceContractorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaintenanceContractorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaintenanceContractorService);
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
