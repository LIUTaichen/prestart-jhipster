/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartQuestionUpdateComponent } from 'app/entities/prestart-question/prestart-question-update.component';
import { PrestartQuestionService } from 'app/entities/prestart-question/prestart-question.service';
import { PrestartQuestion } from 'app/shared/model/prestart-question.model';

describe('Component Tests', () => {
    describe('PrestartQuestion Management Update Component', () => {
        let comp: PrestartQuestionUpdateComponent;
        let fixture: ComponentFixture<PrestartQuestionUpdateComponent>;
        let service: PrestartQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartQuestionUpdateComponent]
            })
                .overrideTemplate(PrestartQuestionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartQuestionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartQuestionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestartQuestion(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartQuestion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestartQuestion();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartQuestion = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
