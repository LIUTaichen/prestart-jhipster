/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckConfigUpdateComponent } from 'app/entities/prestart-check-config/prestart-check-config-update.component';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config/prestart-check-config.service';
import { PrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';

describe('Component Tests', () => {
    describe('PrestartCheckConfig Management Update Component', () => {
        let comp: PrestartCheckConfigUpdateComponent;
        let fixture: ComponentFixture<PrestartCheckConfigUpdateComponent>;
        let service: PrestartCheckConfigService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckConfigUpdateComponent]
            })
                .overrideTemplate(PrestartCheckConfigUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckConfigUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckConfigService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestartCheckConfig(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartCheckConfig = entity;
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
                    const entity = new PrestartCheckConfig();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartCheckConfig = entity;
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
