import { element, by, promise, ElementFinder } from 'protractor';

export class PeopleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-people div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PeopleUpdatePage {
    pageTitle = element(by.id('jhi-people-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    emailInput = element(by.id('field_email'));
    phoneInput = element(by.id('field_phone'));
    nameInput = element(by.id('field_name'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setEmailInput(email): promise.Promise<void> {
        return this.emailInput.sendKeys(email);
    }

    getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    setPhoneInput(phone): promise.Promise<void> {
        return this.phoneInput.sendKeys(phone);
    }

    getPhoneInput() {
        return this.phoneInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
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
