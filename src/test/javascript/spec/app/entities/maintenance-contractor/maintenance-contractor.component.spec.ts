/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { MaintenanceContractorComponent } from 'app/entities/maintenance-contractor/maintenance-contractor.component';
import { MaintenanceContractorService } from 'app/entities/maintenance-contractor/maintenance-contractor.service';
import { MaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';

describe('Component Tests', () => {
    describe('MaintenanceContractor Management Component', () => {
        let comp: MaintenanceContractorComponent;
        let fixture: ComponentFixture<MaintenanceContractorComponent>;
        let service: MaintenanceContractorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [MaintenanceContractorComponent],
                providers: []
            })
                .overrideTemplate(MaintenanceContractorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaintenanceContractorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaintenanceContractorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MaintenanceContractor(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.maintenanceContractors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
