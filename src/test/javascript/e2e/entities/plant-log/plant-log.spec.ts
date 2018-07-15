import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PlantLogComponentsPage, PlantLogUpdatePage } from './plant-log.page-object';

describe('PlantLog e2e test', () => {
    let navBarPage: NavBarPage;
    let plantLogUpdatePage: PlantLogUpdatePage;
    let plantLogComponentsPage: PlantLogComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PlantLogs', () => {
        navBarPage.goToEntity('plant-log');
        plantLogComponentsPage = new PlantLogComponentsPage();
        expect(plantLogComponentsPage.getTitle()).toMatch(/prestartApp.plantLog.home.title/);
    });

    it('should load create PlantLog page', () => {
        plantLogComponentsPage.clickOnCreateButton();
        plantLogUpdatePage = new PlantLogUpdatePage();
        expect(plantLogUpdatePage.getPageTitle()).toMatch(/prestartApp.plantLog.home.createOrEditLabel/);
        plantLogUpdatePage.cancel();
    });

    it('should create and save PlantLogs', () => {
        plantLogComponentsPage.clickOnCreateButton();
        plantLogUpdatePage.setMeterReadingInput('5');
        expect(plantLogUpdatePage.getMeterReadingInput()).toMatch('5');
        plantLogUpdatePage.setHubboReadingInput('5');
        expect(plantLogUpdatePage.getHubboReadingInput()).toMatch('5');
        plantLogUpdatePage.setServiceDueAtInput('5');
        expect(plantLogUpdatePage.getServiceDueAtInput()).toMatch('5');
        plantLogUpdatePage.setRucDueAtInput('5');
        expect(plantLogUpdatePage.getRucDueAtInput()).toMatch('5');
        plantLogUpdatePage.setWofDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantLogUpdatePage.getWofDueDateInput()).toContain('2001-01-01T02:30');
        plantLogUpdatePage.setCofDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantLogUpdatePage.getCofDueDateInput()).toContain('2001-01-01T02:30');
        plantLogUpdatePage.setServiceDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantLogUpdatePage.getServiceDueDateInput()).toContain('2001-01-01T02:30');
        plantLogUpdatePage.plantSelectLastOption();
        plantLogUpdatePage.operatorSelectLastOption();
        plantLogUpdatePage.siteSelectLastOption();
        plantLogUpdatePage.save();
        expect(plantLogUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
