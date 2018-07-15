/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckQuestionListItemDetailComponent } from 'app/entities/prestart-check-question-list-item/prestart-check-question-list-item-detail.component';
import { PrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';

describe('Component Tests', () => {
    describe('PrestartCheckQuestionListItem Management Detail Component', () => {
        let comp: PrestartCheckQuestionListItemDetailComponent;
        let fixture: ComponentFixture<PrestartCheckQuestionListItemDetailComponent>;
        const route = ({ data: of({ prestartCheckQuestionListItem: new PrestartCheckQuestionListItem(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckQuestionListItemDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestartCheckQuestionListItemDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckQuestionListItemDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestartCheckQuestionListItem).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
