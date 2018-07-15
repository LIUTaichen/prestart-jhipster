import { element, by, promise, ElementFinder } from 'protractor';

export class PrestartCheckResponseComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-prestart-check-response div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrestartCheckResponseUpdatePage {
    pageTitle = element(by.id('jhi-prestart-check-response-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    prestartCheckSelect = element(by.id('field_prestartCheck'));
    questionSelect = element(by.id('field_question'));
    responseSelect = element(by.id('field_response'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    prestartCheckSelectLastOption(): promise.Promise<void> {
        return this.prestartCheckSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    prestartCheckSelectOption(option): promise.Promise<void> {
        return this.prestartCheckSelect.sendKeys(option);
    }

    getPrestartCheckSelect(): ElementFinder {
        return this.prestartCheckSelect;
    }

    getPrestartCheckSelectedOption() {
        return this.prestartCheckSelect.element(by.css('option:checked')).getText();
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

    responseSelectLastOption(): promise.Promise<void> {
        return this.responseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    responseSelectOption(option): promise.Promise<void> {
        return this.responseSelect.sendKeys(option);
    }

    getResponseSelect(): ElementFinder {
        return this.responseSelect;
    }

    getResponseSelectedOption() {
        return this.responseSelect.element(by.css('option:checked')).getText();
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
