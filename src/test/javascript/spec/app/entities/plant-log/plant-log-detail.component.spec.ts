/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { PlantLogDetailComponent } from 'app/entities/plant-log/plant-log-detail.component';
import { PlantLog } from 'app/shared/model/plant-log.model';

describe('Component Tests', () => {
    describe('PlantLog Management Detail Component', () => {
        let comp: PlantLogDetailComponent;
        let fixture: ComponentFixture<PlantLogDetailComponent>;
        const route = ({ data: of({ plantLog: new PlantLog(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PlantLogDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PlantLogDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlantLogDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.plantLog).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
