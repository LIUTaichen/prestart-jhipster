import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { EmailSubscriptionComponentsPage, EmailSubscriptionUpdatePage } from './email-subscription.page-object';

describe('EmailSubscription e2e test', () => {
    let navBarPage: NavBarPage;
    let emailSubscriptionUpdatePage: EmailSubscriptionUpdatePage;
    let emailSubscriptionComponentsPage: EmailSubscriptionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EmailSubscriptions', () => {
        navBarPage.goToEntity('email-subscription');
        emailSubscriptionComponentsPage = new EmailSubscriptionComponentsPage();
        expect(emailSubscriptionComponentsPage.getTitle()).toMatch(/prestartApp.emailSubscription.home.title/);
    });

    it('should load create EmailSubscription page', () => {
        emailSubscriptionComponentsPage.clickOnCreateButton();
        emailSubscriptionUpdatePage = new EmailSubscriptionUpdatePage();
        expect(emailSubscriptionUpdatePage.getPageTitle()).toMatch(/prestartApp.emailSubscription.home.createOrEditLabel/);
        emailSubscriptionUpdatePage.cancel();
    });

    it('should create and save EmailSubscriptions', () => {
        emailSubscriptionComponentsPage.clickOnCreateButton();
        emailSubscriptionUpdatePage.eventSelectLastOption();
        emailSubscriptionUpdatePage.setEmailInput('email');
        expect(emailSubscriptionUpdatePage.getEmailInput()).toMatch('email');
        emailSubscriptionUpdatePage.recipientTypeSelectLastOption();
        emailSubscriptionUpdatePage.save();
        expect(emailSubscriptionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
