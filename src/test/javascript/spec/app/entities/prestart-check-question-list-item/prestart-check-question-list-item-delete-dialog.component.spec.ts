/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckQuestionListItemDeleteDialogComponent } from 'app/entities/prestart-check-question-list-item/prestart-check-question-list-item-delete-dialog.component';
import { PrestartCheckQuestionListItemService } from 'app/entities/prestart-check-question-list-item/prestart-check-question-list-item.service';

describe('Component Tests', () => {
    describe('PrestartCheckQuestionListItem Management Delete Component', () => {
        let comp: PrestartCheckQuestionListItemDeleteDialogComponent;
        let fixture: ComponentFixture<PrestartCheckQuestionListItemDeleteDialogComponent>;
        let service: PrestartCheckQuestionListItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckQuestionListItemDeleteDialogComponent]
            })
                .overrideTemplate(PrestartCheckQuestionListItemDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckQuestionListItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckQuestionListItemService);
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
