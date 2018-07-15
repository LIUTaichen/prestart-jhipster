/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckComponent } from 'app/entities/prestart-check/prestart-check.component';
import { PrestartCheckService } from 'app/entities/prestart-check/prestart-check.service';
import { PrestartCheck } from 'app/shared/model/prestart-check.model';

describe('Component Tests', () => {
    describe('PrestartCheck Management Component', () => {
        let comp: PrestartCheckComponent;
        let fixture: ComponentFixture<PrestartCheckComponent>;
        let service: PrestartCheckService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckComponent],
                providers: []
            })
                .overrideTemplate(PrestartCheckComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrestartCheck(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prestartChecks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
