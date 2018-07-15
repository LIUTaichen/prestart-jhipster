import { element, by, promise, ElementFinder } from 'protractor';

export class PrestartQuestionOptionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-prestart-question-option div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PrestartQuestionOptionUpdatePage {
    pageTitle = element(by.id('jhi-prestart-question-option-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bodyInput = element(by.id('field_body'));
    isNormalInput = element(by.id('field_isNormal'));
    isActiveInput = element(by.id('field_isActive'));
    questionSelect = element(by.id('field_question'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setBodyInput(body): promise.Promise<void> {
        return this.bodyInput.sendKeys(body);
    }

    getBodyInput() {
        return this.bodyInput.getAttribute('value');
    }

    getIsNormalInput() {
        return this.isNormalInput;
    }
    getIsActiveInput() {
        return this.isActiveInput;
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
