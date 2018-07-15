/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { CompetencyUpdateComponent } from 'app/entities/competency/competency-update.component';
import { CompetencyService } from 'app/entities/competency/competency.service';
import { Competency } from 'app/shared/model/competency.model';

describe('Component Tests', () => {
    describe('Competency Management Update Component', () => {
        let comp: CompetencyUpdateComponent;
        let fixture: ComponentFixture<CompetencyUpdateComponent>;
        let service: CompetencyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [CompetencyUpdateComponent]
            })
                .overrideTemplate(CompetencyUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompetencyUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompetencyService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Competency(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.competency = entity;
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
                    const entity = new Competency();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.competency = entity;
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
