import { element, by, promise, ElementFinder } from 'protractor';

export class NiggleComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-niggle div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NiggleUpdatePage {
    pageTitle = element(by.id('jhi-niggle-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    statusSelect = element(by.id('field_status'));
    noteInput = element(by.id('field_note'));
    prioritySelect = element(by.id('field_priority'));
    quattraReferenceInput = element(by.id('field_quattraReference'));
    quattraCommentsInput = element(by.id('field_quattraComments'));
    invoiceNoInput = element(by.id('field_invoiceNo'));
    dateOpenedInput = element(by.id('field_dateOpened'));
    dateClosedInput = element(by.id('field_dateClosed'));
    dateCompletedInput = element(by.id('field_dateCompleted'));
    etaInput = element(by.id('field_eta'));
    purchaseOrderSelect = element(by.id('field_purchaseOrder'));
    plantSelect = element(by.id('field_plant'));
    assignedContractorSelect = element(by.id('field_assignedContractor'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setStatusSelect(status): promise.Promise<void> {
        return this.statusSelect.sendKeys(status);
    }

    getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption(): promise.Promise<void> {
        return this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setNoteInput(note): promise.Promise<void> {
        return this.noteInput.sendKeys(note);
    }

    getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    setPrioritySelect(priority): promise.Promise<void> {
        return this.prioritySelect.sendKeys(priority);
    }

    getPrioritySelect() {
        return this.prioritySelect.element(by.css('option:checked')).getText();
    }

    prioritySelectLastOption(): promise.Promise<void> {
        return this.prioritySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setQuattraReferenceInput(quattraReference): promise.Promise<void> {
        return this.quattraReferenceInput.sendKeys(quattraReference);
    }

    getQuattraReferenceInput() {
        return this.quattraReferenceInput.getAttribute('value');
    }

    setQuattraCommentsInput(quattraComments): promise.Promise<void> {
        return this.quattraCommentsInput.sendKeys(quattraComments);
    }

    getQuattraCommentsInput() {
        return this.quattraCommentsInput.getAttribute('value');
    }

    setInvoiceNoInput(invoiceNo): promise.Promise<void> {
        return this.invoiceNoInput.sendKeys(invoiceNo);
    }

    getInvoiceNoInput() {
        return this.invoiceNoInput.getAttribute('value');
    }

    setDateOpenedInput(dateOpened): promise.Promise<void> {
        return this.dateOpenedInput.sendKeys(dateOpened);
    }

    getDateOpenedInput() {
        return this.dateOpenedInput.getAttribute('value');
    }

    setDateClosedInput(dateClosed): promise.Promise<void> {
        return this.dateClosedInput.sendKeys(dateClosed);
    }

    getDateClosedInput() {
        return this.dateClosedInput.getAttribute('value');
    }

    setDateCompletedInput(dateCompleted): promise.Promise<void> {
        return this.dateCompletedInput.sendKeys(dateCompleted);
    }

    getDateCompletedInput() {
        return this.dateCompletedInput.getAttribute('value');
    }

    setEtaInput(eta): promise.Promise<void> {
        return this.etaInput.sendKeys(eta);
    }

    getEtaInput() {
        return this.etaInput.getAttribute('value');
    }

    purchaseOrderSelectLastOption(): promise.Promise<void> {
        return this.purchaseOrderSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    purchaseOrderSelectOption(option): promise.Promise<void> {
        return this.purchaseOrderSelect.sendKeys(option);
    }

    getPurchaseOrderSelect(): ElementFinder {
        return this.purchaseOrderSelect;
    }

    getPurchaseOrderSelectedOption() {
        return this.purchaseOrderSelect.element(by.css('option:checked')).getText();
    }

    plantSelectLastOption(): promise.Promise<void> {
        return this.plantSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    plantSelectOption(option): promise.Promise<void> {
        return this.plantSelect.sendKeys(option);
    }

    getPlantSelect(): ElementFinder {
        return this.plantSelect;
    }

    getPlantSelectedOption() {
        return this.plantSelect.element(by.css('option:checked')).getText();
    }

    assignedContractorSelectLastOption(): promise.Promise<void> {
        return this.assignedContractorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    assignedContractorSelectOption(option): promise.Promise<void> {
        return this.assignedContractorSelect.sendKeys(option);
    }

    getAssignedContractorSelect(): ElementFinder {
        return this.assignedContractorSelect;
    }

    getAssignedContractorSelectedOption() {
        return this.assignedContractorSelect.element(by.css('option:checked')).getText();
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
