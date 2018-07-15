/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { CompetencyDetailComponent } from 'app/entities/competency/competency-detail.component';
import { Competency } from 'app/shared/model/competency.model';

describe('Component Tests', () => {
    describe('Competency Management Detail Component', () => {
        let comp: CompetencyDetailComponent;
        let fixture: ComponentFixture<CompetencyDetailComponent>;
        const route = ({ data: of({ competency: new Competency(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [CompetencyDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompetencyDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompetencyDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.competency).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
