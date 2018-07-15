/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { NiggleSnapshotDetailComponent } from 'app/entities/niggle-snapshot/niggle-snapshot-detail.component';
import { NiggleSnapshot } from 'app/shared/model/niggle-snapshot.model';

describe('Component Tests', () => {
    describe('NiggleSnapshot Management Detail Component', () => {
        let comp: NiggleSnapshotDetailComponent;
        let fixture: ComponentFixture<NiggleSnapshotDetailComponent>;
        const route = ({ data: of({ niggleSnapshot: new NiggleSnapshot(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [NiggleSnapshotDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NiggleSnapshotDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NiggleSnapshotDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.niggleSnapshot).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
