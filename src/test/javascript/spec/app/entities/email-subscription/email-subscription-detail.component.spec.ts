/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { EmailSubscriptionDetailComponent } from 'app/entities/email-subscription/email-subscription-detail.component';
import { EmailSubscription } from 'app/shared/model/email-subscription.model';

describe('Component Tests', () => {
    describe('EmailSubscription Management Detail Component', () => {
        let comp: EmailSubscriptionDetailComponent;
        let fixture: ComponentFixture<EmailSubscriptionDetailComponent>;
        const route = ({ data: of({ emailSubscription: new EmailSubscription(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [EmailSubscriptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EmailSubscriptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EmailSubscriptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.emailSubscription).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
