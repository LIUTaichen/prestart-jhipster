/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckConfigDetailComponent } from 'app/entities/prestart-check-config/prestart-check-config-detail.component';
import { PrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';

describe('Component Tests', () => {
    describe('PrestartCheckConfig Management Detail Component', () => {
        let comp: PrestartCheckConfigDetailComponent;
        let fixture: ComponentFixture<PrestartCheckConfigDetailComponent>;
        const route = ({ data: of({ prestartCheckConfig: new PrestartCheckConfig(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckConfigDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestartCheckConfigDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestartCheckConfigDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestartCheckConfig).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
