/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { MaintenanceContractorDetailComponent } from 'app/entities/maintenance-contractor/maintenance-contractor-detail.component';
import { MaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';

describe('Component Tests', () => {
    describe('MaintenanceContractor Management Detail Component', () => {
        let comp: MaintenanceContractorDetailComponent;
        let fixture: ComponentFixture<MaintenanceContractorDetailComponent>;
        const route = ({ data: of({ maintenanceContractor: new MaintenanceContractor(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [MaintenanceContractorDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MaintenanceContractorDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaintenanceContractorDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.maintenanceContractor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
