/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { OffHireRequestUpdateComponent } from 'app/entities/off-hire-request/off-hire-request-update.component';
import { OffHireRequestService } from 'app/entities/off-hire-request/off-hire-request.service';
import { OffHireRequest } from 'app/shared/model/off-hire-request.model';

describe('Component Tests', () => {
    describe('OffHireRequest Management Update Component', () => {
        let comp: OffHireRequestUpdateComponent;
        let fixture: ComponentFixture<OffHireRequestUpdateComponent>;
        let service: OffHireRequestService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [OffHireRequestUpdateComponent]
            })
                .overrideTemplate(OffHireRequestUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OffHireRequestUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OffHireRequestService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OffHireRequest(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.offHireRequest = entity;
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
                    const entity = new OffHireRequest();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.offHireRequest = entity;
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
