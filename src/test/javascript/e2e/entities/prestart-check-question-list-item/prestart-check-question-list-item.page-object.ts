import { element, by, promise, ElementFinder } from 'protractor';

export class PrestartCheckQuestionListItemComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-prestart-check-question-list-item div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrestartCheckQuestionListItemUpdatePage {
    pageTitle = element(by.id('jhi-prestart-check-question-list-item-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    orderInput = element(by.id('field_order'));
    prestartCheckConfigSelect = element(by.id('field_prestartCheckConfig'));
    questionSelect = element(by.id('field_question'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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

    questionSelectLastOption(): promise.Promise<void> {
        return this.questionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    questionSelectOption(option): promise.Promise<void> {
        return this.questionSelect.sendKeys(option);
    }

    getQuestionSelect(): ElementFinder {
        return this.questionSelect;
    }

    getQuestionSelectedOption() {
        return this.questionSelect.element(by.css('option:checked')).getText();
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
