/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckQuestionListItemComponent } from 'app/entities/prestart-check-question-list-item/prestart-check-question-list-item.component';
import { PrestartCheckQuestionListItemService } from 'app/entities/prestart-check-question-list-item/prestart-check-question-list-item.service';
import { PrestartCheckQuestionListItem } from 'app/shared/model/prestart-check-question-list-item.model';

describe('Component Tests', () => {
    describe('PrestartCheckQuestionListItem Management Component', () => {
        let comp: PrestartCheckQuestionListItemComponent;
        let fixture: ComponentFixture<PrestartCheckQuestionListItemComponent>;
        let service: PrestartCheckQuestionListItemService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckQuestionListItemComponent],
                providers: []
            })
                .overrideTemplate(PrestartCheckQuestionListItemComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckQuestionListItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckQuestionListItemService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrestartCheckQuestionListItem(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prestartCheckQuestionListItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
