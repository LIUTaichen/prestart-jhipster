/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestartTestModule } from '../../../test.module';
import { EmailSubscriptionUpdateComponent } from 'app/entities/email-subscription/email-subscription-update.component';
import { EmailSubscriptionService } from 'app/entities/email-subscription/email-subscription.service';
import { EmailSubscription } from 'app/shared/model/email-subscription.model';

describe('Component Tests', () => {
    describe('EmailSubscription Management Update Component', () => {
        let comp: EmailSubscriptionUpdateComponent;
        let fixture: ComponentFixture<EmailSubscriptionUpdateComponent>;
        let service: EmailSubscriptionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestartTestModule],
                declarations: [EmailSubscriptionUpdateComponent]
            })
                .overrideTemplate(EmailSubscriptionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmailSubscriptionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailSubscriptionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmailSubscription(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.emailSubscription = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EmailSubscription();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.emailSubscription = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
