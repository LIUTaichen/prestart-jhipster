import { element, by, promise, ElementFinder } from 'protractor';

export class CompetencyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-competency div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CompetencyUpdatePage {
    pageTitle = element(by.id('jhi-competency-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    competencyInput = element(by.id('field_competency'));
    groupingInput = element(by.id('field_grouping'));
    sortOrderInput = element(by.id('field_sortOrder'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCompetencyInput(competency): promise.Promise<void> {
        return this.competencyInput.sendKeys(competency);
    }

    getCompetencyInput() {
        return this.competencyInput.getAttribute('value');
    }

    setGroupingInput(grouping): promise.Promise<void> {
        return this.groupingInput.sendKeys(grouping);
    }

    getGroupingInput() {
        return this.groupingInput.getAttribute('value');
    }

    setSortOrderInput(sortOrder): promise.Promise<void> {
        return this.sortOrderInput.sendKeys(sortOrder);
    }

    getSortOrderInput() {
        return this.sortOrderInput.getAttribute('value');
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
