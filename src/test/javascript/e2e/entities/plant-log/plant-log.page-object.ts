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
    meterReadingInput = element(by.id('field_meterReading'));
    hubboReadingInput = element(by.id('field_hubboReading'));
    serviceDueAtInput = element(by.id('field_serviceDueAt'));
    rucDueAtInput = element(by.id('field_rucDueAt'));
    wofDueDateInput = element(by.id('field_wofDueDate'));
    cofDueDateInput = element(by.id('field_cofDueDate'));
    serviceDueDateInput = element(by.id('field_serviceDueDate'));
    plantSelect = element(by.id('field_plant'));
    operatorSelect = element(by.id('field_operator'));
    siteSelect = element(by.id('field_site'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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

    setServiceDueAtInput(serviceDueAt): promise.Promise<void> {
        return this.serviceDueAtInput.sendKeys(serviceDueAt);
    }

    getServiceDueAtInput() {
        return this.serviceDueAtInput.getAttribute('value');
    }

    setRucDueAtInput(rucDueAt): promise.Promise<void> {
        return this.rucDueAtInput.sendKeys(rucDueAt);
    }

    getRucDueAtInput() {
        return this.rucDueAtInput.getAttribute('value');
    }

    setWofDueDateInput(wofDueDate): promise.Promise<void> {
        return this.wofDueDateInput.sendKeys(wofDueDate);
    }

    getWofDueDateInput() {
        return this.wofDueDateInput.getAttribute('value');
    }

    setCofDueDateInput(cofDueDate): promise.Promise<void> {
        return this.cofDueDateInput.sendKeys(cofDueDate);
    }

    getCofDueDateInput() {
        return this.cofDueDateInput.getAttribute('value');
    }

    setServiceDueDateInput(serviceDueDate): promise.Promise<void> {
        return this.serviceDueDateInput.sendKeys(serviceDueDate);
    }

    getServiceDueDateInput() {
        return this.serviceDueDateInput.getAttribute('value');
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

    operatorSelectLastOption(): promise.Promise<void> {
        return this.operatorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    operatorSelectOption(option): promise.Promise<void> {
        return this.operatorSelect.sendKeys(option);
    }

    getOperatorSelect(): ElementFinder {
        return this.operatorSelect;
    }

    getOperatorSelectedOption() {
        return this.operatorSelect.element(by.css('option:checked')).getText();
    }

    siteSelectLastOption(): promise.Promise<void> {
        return this.siteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    siteSelectOption(option): promise.Promise<void> {
        return this.siteSelect.sendKeys(option);
    }

    getSiteSelect(): ElementFinder {
        return this.siteSelect;
    }

    getSiteSelectedOption() {
        return this.siteSelect.element(by.css('option:checked')).getText();
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
