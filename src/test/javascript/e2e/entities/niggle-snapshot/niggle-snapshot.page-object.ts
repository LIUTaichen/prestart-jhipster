import { element, by, promise, ElementFinder } from 'protractor';

export class NiggleSnapshotComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-niggle-snapshot div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NiggleSnapshotUpdatePage {
    pageTitle = element(by.id('jhi-niggle-snapshot-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    statusSelect = element(by.id('field_status'));
    prioritySelect = element(by.id('field_priority'));
    countInput = element(by.id('field_count'));
    ageOfOldestInput = element(by.id('field_ageOfOldest'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setDateInput(date): promise.Promise<void> {
        return this.dateInput.sendKeys(date);
    }

    getDateInput() {
        return this.dateInput.getAttribute('value');
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
    setCountInput(count): promise.Promise<void> {
        return this.countInput.sendKeys(count);
    }

    getCountInput() {
        return this.countInput.getAttribute('value');
    }

    setAgeOfOldestInput(ageOfOldest): promise.Promise<void> {
        return this.ageOfOldestInput.sendKeys(ageOfOldest);
    }

    getAgeOfOldestInput() {
        return this.ageOfOldestInput.getAttribute('value');
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
