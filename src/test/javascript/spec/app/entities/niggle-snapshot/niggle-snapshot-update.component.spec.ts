/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { NiggleSnapshotUpdateComponent } from 'app/entities/niggle-snapshot/niggle-snapshot-update.component';
import { NiggleSnapshotService } from 'app/entities/niggle-snapshot/niggle-snapshot.service';
import { NiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';

describe('Component Tests', () => {
    describe('NiggleSnapshot Management Update Component', () => {
        let comp: NiggleSnapshotUpdateComponent;
        let fixture: ComponentFixture<NiggleSnapshotUpdateComponent>;
        let service: NiggleSnapshotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [NiggleSnapshotUpdateComponent]
            })
                .overrideTemplate(NiggleSnapshotUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NiggleSnapshotUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiggleSnapshotService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NiggleSnapshot(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.niggleSnapshot = entity;
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
                    const entity = new NiggleSnapshot();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.niggleSnapshot = entity;
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
