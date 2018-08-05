import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PlantComponentsPage, PlantUpdatePage } from './plant.page-object';
import * as path from 'path';

describe('Plant e2e test', () => {
    let navBarPage: NavBarPage;
    let plantUpdatePage: PlantUpdatePage;
    let plantComponentsPage: PlantComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Plants', () => {
        navBarPage.goToEntity('plant');
        plantComponentsPage = new PlantComponentsPage();
        expect(plantComponentsPage.getTitle()).toMatch(/prestartApp.plant.home.title/);
    });

    it('should load create Plant page', () => {
        plantComponentsPage.clickOnCreateButton();
        plantUpdatePage = new PlantUpdatePage();
        expect(plantUpdatePage.getPageTitle()).toMatch(/prestartApp.plant.home.createOrEditLabel/);
        plantUpdatePage.cancel();
    });

    it('should create and save Plants', () => {
        plantComponentsPage.clickOnCreateButton();
        plantUpdatePage.setFleetIdInput('fleetId');
        expect(plantUpdatePage.getFleetIdInput()).toMatch('fleetId');
        plantUpdatePage.setNameInput('name');
        expect(plantUpdatePage.getNameInput()).toMatch('name');
        plantUpdatePage.setNotesInput('notes');
        expect(plantUpdatePage.getNotesInput()).toMatch('notes');
        plantUpdatePage.setPurchaseDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getPurchaseDateInput()).toContain('2001-01-01T02:30');
        plantUpdatePage
            .getIsActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantUpdatePage.getIsActiveInput().click();
                    expect(plantUpdatePage.getIsActiveInput().isSelected()).toBeFalsy();
                } else {
                    plantUpdatePage.getIsActiveInput().click();
                    expect(plantUpdatePage.getIsActiveInput().isSelected()).toBeTruthy();
                }
            });
        plantUpdatePage.setDescriptionInput('description');
        expect(plantUpdatePage.getDescriptionInput()).toMatch('description');
        plantUpdatePage.setVinInput('vin');
        expect(plantUpdatePage.getVinInput()).toMatch('vin');
        plantUpdatePage.setRegoInput('rego');
        expect(plantUpdatePage.getRegoInput()).toMatch('rego');
        plantUpdatePage.setDateOfManufactureInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getDateOfManufactureInput()).toContain('2001-01-01T02:30');
        plantUpdatePage.setImageInput(absolutePath);
        plantUpdatePage.setTankSizeInput('5');
        expect(plantUpdatePage.getTankSizeInput()).toMatch('5');
        plantUpdatePage.setMeterReadingInput('5');
        expect(plantUpdatePage.getMeterReadingInput()).toMatch('5');
        plantUpdatePage.setMaintenanceDueAtInput('5');
        expect(plantUpdatePage.getMaintenanceDueAtInput()).toMatch('5');
        plantUpdatePage.setMaintenanceDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getMaintenanceDueDateInput()).toContain('2001-01-01T02:30');
        plantUpdatePage.setLastMaintenanceDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getLastMaintenanceDateInput()).toContain('2001-01-01T02:30');
        plantUpdatePage.setLastMaintenanceAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getLastMaintenanceAtInput()).toContain('2001-01-01T02:30');
        plantUpdatePage.meterUnitSelectLastOption();
        plantUpdatePage.setCertificateDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getCertificateDueDateInput()).toContain('2001-01-01T02:30');
        plantUpdatePage.setRucDueAtKmInput('5');
        expect(plantUpdatePage.getRucDueAtKmInput()).toMatch('5');
        plantUpdatePage.setHubboReadingInput('5');
        expect(plantUpdatePage.getHubboReadingInput()).toMatch('5');
        plantUpdatePage.setLoadCapacityInput('5');
        expect(plantUpdatePage.getLoadCapacityInput()).toMatch('5');
        plantUpdatePage.setHourlyRateInput('5');
        expect(plantUpdatePage.getHourlyRateInput()).toMatch('5');
        plantUpdatePage.setRegistrationDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(plantUpdatePage.getRegistrationDueDateInput()).toContain('2001-01-01T02:30');
        plantUpdatePage.hireStatusSelectLastOption();
        plantUpdatePage.setGpsDeviceSerialInput('gpsDeviceSerial');
        expect(plantUpdatePage.getGpsDeviceSerialInput()).toMatch('gpsDeviceSerial');
        plantUpdatePage.maintenanceTypeSelectLastOption();
        plantUpdatePage.locationSelectLastOption();
        plantUpdatePage.categorySelectLastOption();
        plantUpdatePage.ownerSelectLastOption();
        plantUpdatePage.assignedContractorSelectLastOption();
        plantUpdatePage.projectSelectLastOption();
        plantUpdatePage.save();
        expect(plantUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
