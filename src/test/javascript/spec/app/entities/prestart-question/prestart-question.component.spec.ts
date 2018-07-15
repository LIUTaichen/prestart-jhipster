/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PrestartQuestionComponent } from 'app/entities/prestart-question/prestart-question.component';
import { PrestartQuestionService } from 'app/entities/prestart-question/prestart-question.service';
import { PrestartQuestion } from 'app/shared/model/prestart-question.model';

describe('Component Tests', () => {
    describe('PrestartQuestion Management Component', () => {
        let comp: PrestartQuestionComponent;
        let fixture: ComponentFixture<PrestartQuestionComponent>;
        let service: PrestartQuestionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartQuestionComponent],
                providers: []
            })
                .overrideTemplate(PrestartQuestionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartQuestionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartQuestionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrestartQuestion(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prestartQuestions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
