/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrestartTestModule } from '../../../test.module';
import { EmailSubscriptionComponent } from 'app/entities/email-subscription/email-subscription.component';
import { EmailSubscriptionService } from 'app/entities/email-subscription/email-subscription.service';
import { EmailSubscription } from 'app/shared/model/email-subscription.model';

describe('Component Tests', () => {
    describe('EmailSubscription Management Component', () => {
        let comp: EmailSubscriptionComponent;
        let fixture: ComponentFixture<EmailSubscriptionComponent>;
        let service: EmailSubscriptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [EmailSubscriptionComponent],
                providers: []
            })
                .overrideTemplate(EmailSubscriptionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmailSubscriptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailSubscriptionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EmailSubscription(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.emailSubscriptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
