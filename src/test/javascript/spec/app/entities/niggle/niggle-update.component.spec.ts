/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { NiggleUpdateComponent } from 'app/entities/niggle/niggle-update.component';
import { NiggleService } from 'app/entities/niggle/niggle.service';
import { Niggle } from 'app/shared/model/niggle.model';

describe('Component Tests', () => {
    describe('Niggle Management Update Component', () => {
        let comp: NiggleUpdateComponent;
        let fixture: ComponentFixture<NiggleUpdateComponent>;
        let service: NiggleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [NiggleUpdateComponent]
            })
                .overrideTemplate(NiggleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NiggleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiggleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Niggle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.niggle = entity;
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
                    const entity = new Niggle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.niggle = entity;
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
