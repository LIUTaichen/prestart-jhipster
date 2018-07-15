/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { OffHireRequestDetailComponent } from 'app/entities/off-hire-request/off-hire-request-detail.component';
import { OffHireRequest } from 'app/shared/model/off-hire-request.model';

describe('Component Tests', () => {
    describe('OffHireRequest Management Detail Component', () => {
        let comp: OffHireRequestDetailComponent;
        let fixture: ComponentFixture<OffHireRequestDetailComponent>;
        const route = ({ data: of({ offHireRequest: new OffHireRequest(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [OffHireRequestDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OffHireRequestDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OffHireRequestDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.offHireRequest).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
