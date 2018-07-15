/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { NiggleSnapshotComponent } from 'app/entities/niggle-snapshot/niggle-snapshot.component';
import { NiggleSnapshotService } from 'app/entities/niggle-snapshot/niggle-snapshot.service';
import { NiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';

describe('Component Tests', () => {
    describe('NiggleSnapshot Management Component', () => {
        let comp: NiggleSnapshotComponent;
        let fixture: ComponentFixture<NiggleSnapshotComponent>;
        let service: NiggleSnapshotService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [NiggleSnapshotComponent],
                providers: []
            })
                .overrideTemplate(NiggleSnapshotComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NiggleSnapshotComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiggleSnapshotService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new NiggleSnapshot(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.niggleSnapshots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
