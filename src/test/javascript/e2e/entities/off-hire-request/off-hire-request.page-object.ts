import { element, by, promise, ElementFinder } from 'protractor';

export class OffHireRequestComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-off-hire-request div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OffHireRequestUpdatePage {
    pageTitle = element(by.id('jhi-off-hire-request-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
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
