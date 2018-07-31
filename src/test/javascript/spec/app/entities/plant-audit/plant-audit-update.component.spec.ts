/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PlantAuditUpdateComponent } from 'app/entities/plant-audit/plant-audit-update.component';
import { PlantAuditService } from 'app/entities/plant-audit/plant-audit.service';
import { PlantAudit } from 'app/shared/model/plant-audit.model';

describe('Component Tests', () => {
    describe('PlantAudit Management Update Component', () => {
        let comp: PlantAuditUpdateComponent;
        let fixture: ComponentFixture<PlantAuditUpdateComponent>;
        let service: PlantAuditService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PlantAuditUpdateComponent]
            })
                .overrideTemplate(PlantAuditUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlantAuditUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlantAuditService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PlantAudit(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plantAudit = entity;
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
                    const entity = new PlantAudit();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plantAudit = entity;
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
