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
    notesInput = element(by.id('field_notes'));
    plantLogSelect = element(by.id('field_plantLog'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setSignatureInput(signature): promise.Promise<void> {
        return this.signatureInput.sendKeys(signature);
    }

    getSignatureInput() {
        return this.signatureInput.getAttribute('value');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
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
