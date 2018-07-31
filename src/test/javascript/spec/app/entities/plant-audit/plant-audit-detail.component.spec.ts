/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PlantAuditDetailComponent } from 'app/entities/plant-audit/plant-audit-detail.component';
import { PlantAudit } from 'app/shared/model/plant-audit.model';

describe('Component Tests', () => {
    describe('PlantAudit Management Detail Component', () => {
        let comp: PlantAuditDetailComponent;
        let fixture: ComponentFixture<PlantAuditDetailComponent>;
        const route = ({ data: of({ plantAudit: new PlantAudit(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PlantAuditDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlantAuditDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlantAuditDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.plantAudit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
