import { element, by, promise, ElementFinder } from 'protractor';

export class PrestartQuestionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-prestart-question div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrestartQuestionUpdatePage {
    pageTitle = element(by.id('jhi-prestart-question-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bodyInput = element(by.id('field_body'));
    isLockOutRequiredInput = element(by.id('field_isLockOutRequired'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setBodyInput(body): promise.Promise<void> {
        return this.bodyInput.sendKeys(body);
    }

    getBodyInput() {
        return this.bodyInput.getAttribute('value');
    }

    getIsLockOutRequiredInput() {
        return this.isLockOutRequiredInput;
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
