import { element, by, promise, ElementFinder } from 'protractor';

export class PurchaseOrderComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-purchase-order div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PurchaseOrderUpdatePage {
    pageTitle = element(by.id('jhi-purchase-order-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    orderNumberInput = element(by.id('field_orderNumber'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setOrderNumberInput(orderNumber): promise.Promise<void> {
        return this.orderNumberInput.sendKeys(orderNumber);
    }

    getOrderNumberInput() {
        return this.orderNumberInput.getAttribute('value');
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
