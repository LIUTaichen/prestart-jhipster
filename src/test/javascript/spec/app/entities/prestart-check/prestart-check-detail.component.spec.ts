/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckDetailComponent } from 'app/entities/prestart-check/prestart-check-detail.component';
import { PrestartCheck } from 'app/shared/model/prestart-check.model';

describe('Component Tests', () => {
    describe('PrestartCheck Management Detail Component', () => {
        let comp: PrestartCheckDetailComponent;
        let fixture: ComponentFixture<PrestartCheckDetailComponent>;
        const route = ({ data: of({ prestartCheck: new PrestartCheck(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestartCheckDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestartCheck).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
