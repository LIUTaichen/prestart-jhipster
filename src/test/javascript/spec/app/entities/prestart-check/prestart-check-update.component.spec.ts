/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckUpdateComponent } from 'app/entities/prestart-check/prestart-check-update.component';
import { PrestartCheckService } from 'app/entities/prestart-check/prestart-check.service';
import { PrestartCheck } from 'app/shared/model/prestart-check.model';

describe('Component Tests', () => {
    describe('PrestartCheck Management Update Component', () => {
        let comp: PrestartCheckUpdateComponent;
        let fixture: ComponentFixture<PrestartCheckUpdateComponent>;
        let service: PrestartCheckService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckUpdateComponent]
            })
                .overrideTemplate(PrestartCheckUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestartCheck(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartCheck = entity;
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
                    const entity = new PrestartCheck();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartCheck = entity;
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
