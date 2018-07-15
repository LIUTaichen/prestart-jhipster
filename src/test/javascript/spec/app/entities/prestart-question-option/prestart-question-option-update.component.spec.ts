/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartQuestionOptionUpdateComponent } from 'app/entities/prestart-question-option/prestart-question-option-update.component';
import { PrestartQuestionOptionService } from 'app/entities/prestart-question-option/prestart-question-option.service';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

describe('Component Tests', () => {
    describe('PrestartQuestionOption Management Update Component', () => {
        let comp: PrestartQuestionOptionUpdateComponent;
        let fixture: ComponentFixture<PrestartQuestionOptionUpdateComponent>;
        let service: PrestartQuestionOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartQuestionOptionUpdateComponent]
            })
                .overrideTemplate(PrestartQuestionOptionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartQuestionOptionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartQuestionOptionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestartQuestionOption(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartQuestionOption = entity;
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
                    const entity = new PrestartQuestionOption();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartQuestionOption = entity;
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
