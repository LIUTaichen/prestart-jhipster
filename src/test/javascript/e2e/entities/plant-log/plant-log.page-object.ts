import { element, by, promise, ElementFinder } from 'protractor';

export class PlantLogComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-plant-log div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlantLogUpdatePage {
    pageTitle = element(by.id('jhi-plant-log-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    notesInput = element(by.id('field_notes'));
    meterReadingInput = element(by.id('field_meterReading'));
    hubboReadingInput = element(by.id('field_hubboReading'));
    maintenanceDueAtInput = element(by.id('field_maintenanceDueAt'));
    rucDueAtInput = element(by.id('field_rucDueAt'));
    certificateDueDateInput = element(by.id('field_certificateDueDate'));
    maintenanceDueDateInput = element(by.id('field_maintenanceDueDate'));
    registrationDueDateInput = element(by.id('field_registrationDueDate'));
    lastMaintenanceDateInput = element(by.id('field_lastMaintenanceDate'));
    lastMaintenanceAtInput = element(by.id('field_lastMaintenanceAt'));
    operatorNameInput = element(by.id('field_operatorName'));
    locationSelect = element(by.id('field_location'));
    plantSelect = element(by.id('field_plant'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
    }

    setMeterReadingInput(meterReading): promise.Promise<void> {
        return this.meterReadingInput.sendKeys(meterReading);
    }

    getMeterReadingInput() {
        return this.meterReadingInput.getAttribute('value');
    }

    setHubboReadingInput(hubboReading): promise.Promise<void> {
        return this.hubboReadingInput.sendKeys(hubboReading);
    }

    getHubboReadingInput() {
        return this.hubboReadingInput.getAttribute('value');
    }

    setMaintenanceDueAtInput(maintenanceDueAt): promise.Promise<void> {
        return this.maintenanceDueAtInput.sendKeys(maintenanceDueAt);
    }

    getMaintenanceDueAtInput() {
        return this.maintenanceDueAtInput.getAttribute('value');
    }

    setRucDueAtInput(rucDueAt): promise.Promise<void> {
        return this.rucDueAtInput.sendKeys(rucDueAt);
    }

    getRucDueAtInput() {
        return this.rucDueAtInput.getAttribute('value');
    }

    setCertificateDueDateInput(certificateDueDate): promise.Promise<void> {
        return this.certificateDueDateInput.sendKeys(certificateDueDate);
    }

    getCertificateDueDateInput() {
        return this.certificateDueDateInput.getAttribute('value');
    }

    setMaintenanceDueDateInput(maintenanceDueDate): promise.Promise<void> {
        return this.maintenanceDueDateInput.sendKeys(maintenanceDueDate);
    }

    getMaintenanceDueDateInput() {
        return this.maintenanceDueDateInput.getAttribute('value');
    }

    setRegistrationDueDateInput(registrationDueDate): promise.Promise<void> {
        return this.registrationDueDateInput.sendKeys(registrationDueDate);
    }

    getRegistrationDueDateInput() {
        return this.registrationDueDateInput.getAttribute('value');
    }

    setLastMaintenanceDateInput(lastMaintenanceDate): promise.Promise<void> {
        return this.lastMaintenanceDateInput.sendKeys(lastMaintenanceDate);
    }

    getLastMaintenanceDateInput() {
        return this.lastMaintenanceDateInput.getAttribute('value');
    }

    setLastMaintenanceAtInput(lastMaintenanceAt): promise.Promise<void> {
        return this.lastMaintenanceAtInput.sendKeys(lastMaintenanceAt);
    }

    getLastMaintenanceAtInput() {
        return this.lastMaintenanceAtInput.getAttribute('value');
    }

    setOperatorNameInput(operatorName): promise.Promise<void> {
        return this.operatorNameInput.sendKeys(operatorName);
    }

    getOperatorNameInput() {
        return this.operatorNameInput.getAttribute('value');
    }

    locationSelectLastOption(): promise.Promise<void> {
        return this.locationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    locationSelectOption(option): promise.Promise<void> {
        return this.locationSelect.sendKeys(option);
    }

    getLocationSelect(): ElementFinder {
        return this.locationSelect;
    }

    getLocationSelectedOption() {
        return this.locationSelect.element(by.css('option:checked')).getText();
    }

    plantSelectLastOption(): promise.Promise<void> {
        return this.plantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    plantSelectOption(option): promise.Promise<void> {
        return this.plantSelect.sendKeys(option);
    }

    getPlantSelect(): ElementFinder {
        return this.plantSelect;
    }

    getPlantSelectedOption() {
        return this.plantSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
