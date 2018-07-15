/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PrestartQuestionOptionComponent } from 'app/entities/prestart-question-option/prestart-question-option.component';
import { PrestartQuestionOptionService } from 'app/entities/prestart-question-option/prestart-question-option.service';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

describe('Component Tests', () => {
    describe('PrestartQuestionOption Management Component', () => {
        let comp: PrestartQuestionOptionComponent;
        let fixture: ComponentFixture<PrestartQuestionOptionComponent>;
        let service: PrestartQuestionOptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartQuestionOptionComponent],
                providers: []
            })
                .overrideTemplate(PrestartQuestionOptionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartQuestionOptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartQuestionOptionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrestartQuestionOption(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prestartQuestionOptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
