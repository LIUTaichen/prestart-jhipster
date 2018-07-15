import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PrestartCheckComponentsPage, PrestartCheckUpdatePage } from './prestart-check.page-object';
import * as path from 'path';

describe('PrestartCheck e2e test', () => {
    let navBarPage: NavBarPage;
    let prestartCheckUpdatePage: PrestartCheckUpdatePage;
    let prestartCheckComponentsPage: PrestartCheckComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrestartChecks', () => {
        navBarPage.goToEntity('prestart-check');
        prestartCheckComponentsPage = new PrestartCheckComponentsPage();
        expect(prestartCheckComponentsPage.getTitle()).toMatch(/prestartApp.prestartCheck.home.title/);
    });

    it('should load create PrestartCheck page', () => {
        prestartCheckComponentsPage.clickOnCreateButton();
        prestartCheckUpdatePage = new PrestartCheckUpdatePage();
        expect(prestartCheckUpdatePage.getPageTitle()).toMatch(/prestartApp.prestartCheck.home.createOrEditLabel/);
        prestartCheckUpdatePage.cancel();
    });

    it('should create and save PrestartChecks', () => {
        prestartCheckComponentsPage.clickOnCreateButton();
        prestartCheckUpdatePage.setSignatureInput(absolutePath);
        prestartCheckUpdatePage.plantLogSelectLastOption();
        prestartCheckUpdatePage.projectSelectLastOption();
        prestartCheckUpdatePage.plantSelectLastOption();
        prestartCheckUpdatePage.locationSelectLastOption();
        prestartCheckUpdatePage.operatorSelectLastOption();
        prestartCheckUpdatePage.save();
        expect(prestartCheckUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
