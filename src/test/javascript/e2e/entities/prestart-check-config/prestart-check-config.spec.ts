import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PrestartCheckConfigComponentsPage, PrestartCheckConfigUpdatePage } from './prestart-check-config.page-object';

describe('PrestartCheckConfig e2e test', () => {
    let navBarPage: NavBarPage;
    let prestartCheckConfigUpdatePage: PrestartCheckConfigUpdatePage;
    let prestartCheckConfigComponentsPage: PrestartCheckConfigComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrestartCheckConfigs', () => {
        navBarPage.goToEntity('prestart-check-config');
        prestartCheckConfigComponentsPage = new PrestartCheckConfigComponentsPage();
        expect(prestartCheckConfigComponentsPage.getTitle()).toMatch(/prestartApp.prestartCheckConfig.home.title/);
    });

    it('should load create PrestartCheckConfig page', () => {
        prestartCheckConfigComponentsPage.clickOnCreateButton();
        prestartCheckConfigUpdatePage = new PrestartCheckConfigUpdatePage();
        expect(prestartCheckConfigUpdatePage.getPageTitle()).toMatch(/prestartApp.prestartCheckConfig.home.createOrEditLabel/);
        prestartCheckConfigUpdatePage.cancel();
    });

    it('should create and save PrestartCheckConfigs', () => {
        prestartCheckConfigComponentsPage.clickOnCreateButton();
        prestartCheckConfigUpdatePage.setNameInput('name');
        expect(prestartCheckConfigUpdatePage.getNameInput()).toMatch('name');
        prestartCheckConfigUpdatePage.save();
        expect(prestartCheckConfigUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
