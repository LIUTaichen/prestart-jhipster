/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { NiggleComponent } from 'app/entities/niggle/niggle.component';
import { NiggleService } from 'app/entities/niggle/niggle.service';
import { Niggle } from 'app/shared/model/niggle.model';

describe('Component Tests', () => {
    describe('Niggle Management Component', () => {
        let comp: NiggleComponent;
        let fixture: ComponentFixture<NiggleComponent>;
        let service: NiggleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [NiggleComponent],
                providers: []
            })
                .overrideTemplate(NiggleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NiggleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiggleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Niggle(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.niggles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
