import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PrestartCheckResponseComponentsPage, PrestartCheckResponseUpdatePage } from './prestart-check-response.page-object';

describe('PrestartCheckResponse e2e test', () => {
    let navBarPage: NavBarPage;
    let prestartCheckResponseUpdatePage: PrestartCheckResponseUpdatePage;
    let prestartCheckResponseComponentsPage: PrestartCheckResponseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrestartCheckResponses', () => {
        navBarPage.goToEntity('prestart-check-response');
        prestartCheckResponseComponentsPage = new PrestartCheckResponseComponentsPage();
        expect(prestartCheckResponseComponentsPage.getTitle()).toMatch(/prestartApp.prestartCheckResponse.home.title/);
    });

    it('should load create PrestartCheckResponse page', () => {
        prestartCheckResponseComponentsPage.clickOnCreateButton();
        prestartCheckResponseUpdatePage = new PrestartCheckResponseUpdatePage();
        expect(prestartCheckResponseUpdatePage.getPageTitle()).toMatch(/prestartApp.prestartCheckResponse.home.createOrEditLabel/);
        prestartCheckResponseUpdatePage.cancel();
    });

    it('should create and save PrestartCheckResponses', () => {
        prestartCheckResponseComponentsPage.clickOnCreateButton();
        prestartCheckResponseUpdatePage.prestartCheckSelectLastOption();
        prestartCheckResponseUpdatePage.questionSelectLastOption();
        prestartCheckResponseUpdatePage.responseSelectLastOption();
        prestartCheckResponseUpdatePage.save();
        expect(prestartCheckResponseUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
