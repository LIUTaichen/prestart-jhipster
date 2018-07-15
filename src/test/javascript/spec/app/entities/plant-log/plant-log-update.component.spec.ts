/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PlantLogUpdateComponent } from 'app/entities/plant-log/plant-log-update.component';
import { PlantLogService } from 'app/entities/plant-log/plant-log.service';
import { PlantLog } from 'app/shared/model/plant-log.model';

describe('Component Tests', () => {
    describe('PlantLog Management Update Component', () => {
        let comp: PlantLogUpdateComponent;
        let fixture: ComponentFixture<PlantLogUpdateComponent>;
        let service: PlantLogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PlantLogUpdateComponent]
            })
                .overrideTemplate(PlantLogUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlantLogUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlantLogService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PlantLog(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plantLog = entity;
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
                    const entity = new PlantLog();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.plantLog = entity;
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
