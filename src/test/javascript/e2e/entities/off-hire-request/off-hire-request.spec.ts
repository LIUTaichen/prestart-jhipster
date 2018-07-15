import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OffHireRequestComponentsPage, OffHireRequestUpdatePage } from './off-hire-request.page-object';

describe('OffHireRequest e2e test', () => {
    let navBarPage: NavBarPage;
    let offHireRequestUpdatePage: OffHireRequestUpdatePage;
    let offHireRequestComponentsPage: OffHireRequestComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OffHireRequests', () => {
        navBarPage.goToEntity('off-hire-request');
        offHireRequestComponentsPage = new OffHireRequestComponentsPage();
        expect(offHireRequestComponentsPage.getTitle()).toMatch(/prestartApp.offHireRequest.home.title/);
    });

    it('should load create OffHireRequest page', () => {
        offHireRequestComponentsPage.clickOnCreateButton();
        offHireRequestUpdatePage = new OffHireRequestUpdatePage();
        expect(offHireRequestUpdatePage.getPageTitle()).toMatch(/prestartApp.offHireRequest.home.createOrEditLabel/);
        offHireRequestUpdatePage.cancel();
    });

    it('should create and save OffHireRequests', () => {
        offHireRequestComponentsPage.clickOnCreateButton();
        offHireRequestUpdatePage.save();
        expect(offHireRequestUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
