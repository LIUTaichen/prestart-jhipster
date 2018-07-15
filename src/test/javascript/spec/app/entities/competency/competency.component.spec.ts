/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { CompetencyComponent } from 'app/entities/competency/competency.component';
import { CompetencyService } from 'app/entities/competency/competency.service';
import { Competency } from 'app/shared/model/competency.model';

describe('Component Tests', () => {
    describe('Competency Management Component', () => {
        let comp: CompetencyComponent;
        let fixture: ComponentFixture<CompetencyComponent>;
        let service: CompetencyService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [CompetencyComponent],
                providers: []
            })
                .overrideTemplate(CompetencyComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompetencyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompetencyService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Competency(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.competencies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
