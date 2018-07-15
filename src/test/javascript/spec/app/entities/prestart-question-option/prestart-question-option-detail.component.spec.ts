/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartQuestionOptionDetailComponent } from 'app/entities/prestart-question-option/prestart-question-option-detail.component';
import { PrestartQuestionOption } from 'app/shared/model/prestart-question-option.model';

describe('Component Tests', () => {
    describe('PrestartQuestionOption Management Detail Component', () => {
        let comp: PrestartQuestionOptionDetailComponent;
        let fixture: ComponentFixture<PrestartQuestionOptionDetailComponent>;
        const route = ({ data: of({ prestartQuestionOption: new PrestartQuestionOption(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartQuestionOptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestartQuestionOptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartQuestionOptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestartQuestionOption).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
