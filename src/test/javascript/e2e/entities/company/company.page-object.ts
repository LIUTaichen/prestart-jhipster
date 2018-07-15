import { element, by, promise, ElementFinder } from 'protractor';

export class CompanyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-company div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompanyUpdatePage {
    pageTitle = element(by.id('jhi-company-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    companyInput = element(by.id('field_company'));
    phoneInput = element(by.id('field_phone'));
    addressInput = element(by.id('field_address'));
    locationInput = element(by.id('field_location'));
    webPageInput = element(by.id('field_webPage'));
    notesInput = element(by.id('field_notes'));
    isActiveInput = element(by.id('field_isActive'));
    abbreviationInput = element(by.id('field_abbreviation'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCompanyInput(company): promise.Promise<void> {
        return this.companyInput.sendKeys(company);
    }

    getCompanyInput() {
        return this.companyInput.getAttribute('value');
    }

    setPhoneInput(phone): promise.Promise<void> {
        return this.phoneInput.sendKeys(phone);
    }

    getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    setAddressInput(address): promise.Promise<void> {
        return this.addressInput.sendKeys(address);
    }

    getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    setLocationInput(location): promise.Promise<void> {
        return this.locationInput.sendKeys(location);
    }

    getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    setWebPageInput(webPage): promise.Promise<void> {
        return this.webPageInput.sendKeys(webPage);
    }

    getWebPageInput() {
        return this.webPageInput.getAttribute('value');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
    }

    getIsActiveInput() {
        return this.isActiveInput;
    }
    setAbbreviationInput(abbreviation): promise.Promise<void> {
        return this.abbreviationInput.sendKeys(abbreviation);
    }

    getAbbreviationInput() {
        return this.abbreviationInput.getAttribute('value');
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
