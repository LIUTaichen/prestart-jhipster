import { element, by, promise, ElementFinder } from 'protractor';

export class ImageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-image div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ImageUpdatePage {
    pageTitle = element(by.id('jhi-image-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    imageInput = element(by.id('file_image'));
    plantAuditSelect = element(by.id('field_plantAudit'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setImageInput(image): promise.Promise<void> {
        return this.imageInput.sendKeys(image);
    }

    getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    plantAuditSelectLastOption(): promise.Promise<void> {
        return this.plantAuditSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    plantAuditSelectOption(option): promise.Promise<void> {
        return this.plantAuditSelect.sendKeys(option);
    }

    getPlantAuditSelect(): ElementFinder {
        return this.plantAuditSelect;
    }

    getPlantAuditSelectedOption() {
        return this.plantAuditSelect.element(by.css('option:checked')).getText();
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
