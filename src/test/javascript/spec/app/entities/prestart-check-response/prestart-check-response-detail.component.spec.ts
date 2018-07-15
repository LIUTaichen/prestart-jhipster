/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckResponseDetailComponent } from 'app/entities/prestart-check-response/prestart-check-response-detail.component';
import { PrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';

describe('Component Tests', () => {
    describe('PrestartCheckResponse Management Detail Component', () => {
        let comp: PrestartCheckResponseDetailComponent;
        let fixture: ComponentFixture<PrestartCheckResponseDetailComponent>;
        const route = ({ data: of({ prestartCheckResponse: new PrestartCheckResponse(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckResponseDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestartCheckResponseDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckResponseDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestartCheckResponse).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
