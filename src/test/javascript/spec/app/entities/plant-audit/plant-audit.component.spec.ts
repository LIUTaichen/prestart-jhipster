/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PlantAuditComponent } from 'app/entities/plant-audit/plant-audit.component';
import { PlantAuditService } from 'app/entities/plant-audit/plant-audit.service';
import { PlantAudit } from 'app/shared/model/plant-audit.model';

describe('Component Tests', () => {
    describe('PlantAudit Management Component', () => {
        let comp: PlantAuditComponent;
        let fixture: ComponentFixture<PlantAuditComponent>;
        let service: PlantAuditService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PlantAuditComponent],
                providers: []
            })
                .overrideTemplate(PlantAuditComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlantAuditComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlantAuditService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PlantAudit(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.plantAudits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
