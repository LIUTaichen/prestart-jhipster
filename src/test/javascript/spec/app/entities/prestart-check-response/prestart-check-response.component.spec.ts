/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckResponseComponent } from 'app/entities/prestart-check-response/prestart-check-response.component';
import { PrestartCheckResponseService } from 'app/entities/prestart-check-response/prestart-check-response.service';
import { PrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';

describe('Component Tests', () => {
    describe('PrestartCheckResponse Management Component', () => {
        let comp: PrestartCheckResponseComponent;
        let fixture: ComponentFixture<PrestartCheckResponseComponent>;
        let service: PrestartCheckResponseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckResponseComponent],
                providers: []
            })
                .overrideTemplate(PrestartCheckResponseComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckResponseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckResponseService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrestartCheckResponse(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prestartCheckResponses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
