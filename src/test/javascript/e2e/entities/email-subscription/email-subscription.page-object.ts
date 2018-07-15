import { element, by, promise, ElementFinder } from 'protractor';

export class EmailSubscriptionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-email-subscription div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EmailSubscriptionUpdatePage {
    pageTitle = element(by.id('jhi-email-subscription-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    eventSelect = element(by.id('field_event'));
    emailInput = element(by.id('field_email'));
    recipientTypeSelect = element(by.id('field_recipientType'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setEventSelect(event): promise.Promise<void> {
        return this.eventSelect.sendKeys(event);
    }

    getEventSelect() {
        return this.eventSelect.element(by.css('option:checked')).getText();
    }

    eventSelectLastOption(): promise.Promise<void> {
        return this.eventSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setEmailInput(email): promise.Promise<void> {
        return this.emailInput.sendKeys(email);
    }

    getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    setRecipientTypeSelect(recipientType): promise.Promise<void> {
        return this.recipientTypeSelect.sendKeys(recipientType);
    }

    getRecipientTypeSelect() {
        return this.recipientTypeSelect.element(by.css('option:checked')).getText();
    }

    recipientTypeSelectLastOption(): promise.Promise<void> {
        return this.recipientTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
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
