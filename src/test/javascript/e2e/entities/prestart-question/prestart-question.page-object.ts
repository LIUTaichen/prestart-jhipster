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
    orderInput = element(by.id('field_order'));
    prestartCheckConfigSelect = element(by.id('field_prestartCheckConfig'));

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
    setOrderInput(order): promise.Promise<void> {
        return this.orderInput.sendKeys(order);
    }

    getOrderInput() {
        return this.orderInput.getAttribute('value');
    }

    prestartCheckConfigSelectLastOption(): promise.Promise<void> {
        return this.prestartCheckConfigSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    prestartCheckConfigSelectOption(option): promise.Promise<void> {
        return this.prestartCheckConfigSelect.sendKeys(option);
    }

    getPrestartCheckConfigSelect(): ElementFinder {
        return this.prestartCheckConfigSelect;
    }

    getPrestartCheckConfigSelectedOption() {
        return this.prestartCheckConfigSelect.element(by.css('option:checked')).getText();
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
