import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { MaintenanceContractorComponentsPage, MaintenanceContractorUpdatePage } from './maintenance-contractor.page-object';

describe('MaintenanceContractor e2e test', () => {
    let navBarPage: NavBarPage;
    let maintenanceContractorUpdatePage: MaintenanceContractorUpdatePage;
    let maintenanceContractorComponentsPage: MaintenanceContractorComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MaintenanceContractors', () => {
        navBarPage.goToEntity('maintenance-contractor');
        maintenanceContractorComponentsPage = new MaintenanceContractorComponentsPage();
        expect(maintenanceContractorComponentsPage.getTitle()).toMatch(/prestartApp.maintenanceContractor.home.title/);
    });

    it('should load create MaintenanceContractor page', () => {
        maintenanceContractorComponentsPage.clickOnCreateButton();
        maintenanceContractorUpdatePage = new MaintenanceContractorUpdatePage();
        expect(maintenanceContractorUpdatePage.getPageTitle()).toMatch(/prestartApp.maintenanceContractor.home.createOrEditLabel/);
        maintenanceContractorUpdatePage.cancel();
    });

    it('should create and save MaintenanceContractors', () => {
        maintenanceContractorComponentsPage.clickOnCreateButton();
        maintenanceContractorUpdatePage.setNameInput('name');
        expect(maintenanceContractorUpdatePage.getNameInput()).toMatch('name');
        maintenanceContractorUpdatePage.save();
        expect(maintenanceContractorUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
