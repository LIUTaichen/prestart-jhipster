/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { PrestartCheckConfigComponent } from 'app/entities/prestart-check-config/prestart-check-config.component';
import { PrestartCheckConfigService } from 'app/entities/prestart-check-config/prestart-check-config.service';
import { PrestartCheckConfig } from 'app/shared/model/prestart-check-config.model';

describe('Component Tests', () => {
    describe('PrestartCheckConfig Management Component', () => {
        let comp: PrestartCheckConfigComponent;
        let fixture: ComponentFixture<PrestartCheckConfigComponent>;
        let service: PrestartCheckConfigService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [PrestartCheckConfigComponent],
                providers: []
            })
                .overrideTemplate(PrestartCheckConfigComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestartCheckConfigComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestartCheckConfigService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrestartCheckConfig(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.prestartCheckConfigs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
