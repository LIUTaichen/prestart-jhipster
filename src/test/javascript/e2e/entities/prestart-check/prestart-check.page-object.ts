import { element, by, promise, ElementFinder } from 'protractor';

export class PrestartCheckComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-prestart-check div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrestartCheckUpdatePage {
    pageTitle = element(by.id('jhi-prestart-check-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    signatureInput = element(by.id('file_signature'));
    plantLogSelect = element(by.id('field_plantLog'));
    projectSelect = element(by.id('field_project'));
    plantSelect = element(by.id('field_plant'));
    locationSelect = element(by.id('field_location'));
    operatorSelect = element(by.id('field_operator'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setSignatureInput(signature): promise.Promise<void> {
        return this.signatureInput.sendKeys(signature);
    }

    getSignatureInput() {
        return this.signatureInput.getAttribute('value');
    }

    plantLogSelectLastOption(): promise.Promise<void> {
        return this.plantLogSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    plantLogSelectOption(option): promise.Promise<void> {
        return this.plantLogSelect.sendKeys(option);
    }

    getPlantLogSelect(): ElementFinder {
        return this.plantLogSelect;
    }

    getPlantLogSelectedOption() {
        return this.plantLogSelect.element(by.css('option:checked')).getText();
    }

    projectSelectLastOption(): promise.Promise<void> {
        return this.projectSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    projectSelectOption(option): promise.Promise<void> {
        return this.projectSelect.sendKeys(option);
    }

    getProjectSelect(): ElementFinder {
        return this.projectSelect;
    }

    getProjectSelectedOption() {
        return this.projectSelect.element(by.css('option:checked')).getText();
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
