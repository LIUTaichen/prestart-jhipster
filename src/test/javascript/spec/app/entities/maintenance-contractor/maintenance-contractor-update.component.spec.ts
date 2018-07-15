/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { MaintenanceContractorUpdateComponent } from 'app/entities/maintenance-contractor/maintenance-contractor-update.component';
import { MaintenanceContractorService } from 'app/entities/maintenance-contractor/maintenance-contractor.service';
import { MaintenanceContractor } from 'app/shared/model/maintenance-contractor.model';

describe('Component Tests', () => {
    describe('MaintenanceContractor Management Update Component', () => {
        let comp: MaintenanceContractorUpdateComponent;
        let fixture: ComponentFixture<MaintenanceContractorUpdateComponent>;
        let service: MaintenanceContractorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [MaintenanceContractorUpdateComponent]
            })
                .overrideTemplate(MaintenanceContractorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaintenanceContractorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaintenanceContractorService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MaintenanceContractor(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.maintenanceContractor = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MaintenanceContractor();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.maintenanceContractor = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
