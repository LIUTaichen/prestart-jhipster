/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartQuestionDetailComponent } from 'app/entities/prestart-question/prestart-question-detail.component';
import { PrestartQuestion } from 'app/shared/model/prestart-question.model';

describe('Component Tests', () => {
    describe('PrestartQuestion Management Detail Component', () => {
        let comp: PrestartQuestionDetailComponent;
        let fixture: ComponentFixture<PrestartQuestionDetailComponent>;
        const route = ({ data: of({ prestartQuestion: new PrestartQuestion(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartQuestionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestartQuestionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartQuestionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestartQuestion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
