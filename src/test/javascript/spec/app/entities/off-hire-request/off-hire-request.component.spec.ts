/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { OffHireRequestComponent } from 'app/entities/off-hire-request/off-hire-request.component';
import { OffHireRequestService } from 'app/entities/off-hire-request/off-hire-request.service';
import { OffHireRequest } from 'app/shared/model/off-hire-request.model';

describe('Component Tests', () => {
    describe('OffHireRequest Management Component', () => {
        let comp: OffHireRequestComponent;
        let fixture: ComponentFixture<OffHireRequestComponent>;
        let service: OffHireRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [OffHireRequestComponent],
                providers: []
            })
                .overrideTemplate(OffHireRequestComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OffHireRequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffHireRequestService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OffHireRequest(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.offHireRequests[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
