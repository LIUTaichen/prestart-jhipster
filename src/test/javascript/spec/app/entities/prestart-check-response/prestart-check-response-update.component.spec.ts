/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckResponseUpdateComponent } from 'app/entities/prestart-check-response/prestart-check-response-update.component';
import { PrestartCheckResponseService } from 'app/entities/prestart-check-response/prestart-check-response.service';
import { PrestartCheckResponse } from 'app/shared/model/prestart-check-response.model';

describe('Component Tests', () => {
    describe('PrestartCheckResponse Management Update Component', () => {
        let comp: PrestartCheckResponseUpdateComponent;
        let fixture: ComponentFixture<PrestartCheckResponseUpdateComponent>;
        let service: PrestartCheckResponseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckResponseUpdateComponent]
            })
                .overrideTemplate(PrestartCheckResponseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckResponseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckResponseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestartCheckResponse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartCheckResponse = entity;
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
                    const entity = new PrestartCheckResponse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestartCheckResponse = entity;
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
