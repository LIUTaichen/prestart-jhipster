import { element, by, promise, ElementFinder } from 'protractor';

export class ProjectComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-project div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProjectUpdatePage {
    pageTitle = element(by.id('jhi-project-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    jobNoInput = element(by.id('field_jobNo'));
    nameInput = element(by.id('field_name'));
    locationInput = element(by.id('field_location'));
    notesInput = element(by.id('field_notes'));
    startDateInput = element(by.id('field_startDate'));
    endDateInput = element(by.id('field_endDate'));
    isActiveInput = element(by.id('field_isActive'));
    isOnHoldInput = element(by.id('field_isOnHold'));
    detailsInput = element(by.id('field_details'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setJobNoInput(jobNo): promise.Promise<void> {
        return this.jobNoInput.sendKeys(jobNo);
    }

    getJobNoInput() {
        return this.jobNoInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setLocationInput(location): promise.Promise<void> {
        return this.locationInput.sendKeys(location);
    }

    getLocationInput() {
        return this.locationInput.getAttribute('value');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
    }

    setStartDateInput(startDate): promise.Promise<void> {
        return this.startDateInput.sendKeys(startDate);
    }

    getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    setEndDateInput(endDate): promise.Promise<void> {
        return this.endDateInput.sendKeys(endDate);
    }

    getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    getIsActiveInput() {
        return this.isActiveInput;
    }
    getIsOnHoldInput() {
        return this.isOnHoldInput;
    }
    setDetailsInput(details): promise.Promise<void> {
        return this.detailsInput.sendKeys(details);
    }

    getDetailsInput() {
        return this.detailsInput.getAttribute('value');
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
