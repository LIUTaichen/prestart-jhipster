/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PlantLogComponent } from 'app/entities/plant-log/plant-log.component';
import { PlantLogService } from 'app/entities/plant-log/plant-log.service';
import { PlantLog } from 'app/shared/model/plant-log.model';

describe('Component Tests', () => {
    describe('PlantLog Management Component', () => {
        let comp: PlantLogComponent;
        let fixture: ComponentFixture<PlantLogComponent>;
        let service: PlantLogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PlantLogComponent],
                providers: []
            })
                .overrideTemplate(PlantLogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PlantLogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlantLogService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PlantLog(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.plantLogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
