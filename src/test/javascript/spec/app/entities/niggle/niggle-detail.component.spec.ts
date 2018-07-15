/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { NiggleDetailComponent } from 'app/entities/niggle/niggle-detail.component';
import { Niggle } from 'app/shared/model/niggle.model';

describe('Component Tests', () => {
    describe('Niggle Management Detail Component', () => {
        let comp: NiggleDetailComponent;
        let fixture: ComponentFixture<NiggleDetailComponent>;
        const route = ({ data: of({ niggle: new Niggle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [NiggleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NiggleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NiggleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.niggle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
