import { element, by, promise, ElementFinder } from 'protractor';

export class CategoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-category div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CategoryUpdatePage {
    pageTitle = element(by.id('jhi-category-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    categoryInput = element(by.id('field_category'));
    descriptionInput = element(by.id('field_description'));
    typeInput = element(by.id('field_type'));
    trackUsageInput = element(by.id('field_trackUsage'));
    dailyRateInput = element(by.id('field_dailyRate'));
    loadCapacityInput = element(by.id('field_loadCapacity'));
    hourlyRateInput = element(by.id('field_hourlyRate'));
    isEarchMovingPlantInput = element(by.id('field_isEarchMovingPlant'));
    isTrackedForInternalBillingInput = element(by.id('field_isTrackedForInternalBilling'));
    maintenanceGroupSelect = element(by.id('field_maintenanceGroup'));
    competencySelect = element(by.id('field_competency'));
    prestartCheckConfigSelect = element(by.id('field_prestartCheckConfig'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setCategoryInput(category): promise.Promise<void> {
        return this.categoryInput.sendKeys(category);
    }

    getCategoryInput() {
        return this.categoryInput.getAttribute('value');
    }

    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setTypeInput(type): promise.Promise<void> {
        return this.typeInput.sendKeys(type);
    }

    getTypeInput() {
        return this.typeInput.getAttribute('value');
    }

    getTrackUsageInput() {
        return this.trackUsageInput;
    }
    setDailyRateInput(dailyRate): promise.Promise<void> {
        return this.dailyRateInput.sendKeys(dailyRate);
    }

    getDailyRateInput() {
        return this.dailyRateInput.getAttribute('value');
    }

    setLoadCapacityInput(loadCapacity): promise.Promise<void> {
        return this.loadCapacityInput.sendKeys(loadCapacity);
    }

    getLoadCapacityInput() {
        return this.loadCapacityInput.getAttribute('value');
    }

    setHourlyRateInput(hourlyRate): promise.Promise<void> {
        return this.hourlyRateInput.sendKeys(hourlyRate);
    }

    getHourlyRateInput() {
        return this.hourlyRateInput.getAttribute('value');
    }

    getIsEarchMovingPlantInput() {
        return this.isEarchMovingPlantInput;
    }
    getIsTrackedForInternalBillingInput() {
        return this.isTrackedForInternalBillingInput;
    }
    setMaintenanceGroupSelect(maintenanceGroup): promise.Promise<void> {
        return this.maintenanceGroupSelect.sendKeys(maintenanceGroup);
    }

    getMaintenanceGroupSelect() {
        return this.maintenanceGroupSelect.element(by.css('option:checked')).getText();
    }

    maintenanceGroupSelectLastOption(): promise.Promise<void> {
        return this.maintenanceGroupSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    competencySelectLastOption(): promise.Promise<void> {
        return this.competencySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    competencySelectOption(option): promise.Promise<void> {
        return this.competencySelect.sendKeys(option);
    }

    getCompetencySelect(): ElementFinder {
        return this.competencySelect;
    }

    getCompetencySelectedOption() {
        return this.competencySelect.element(by.css('option:checked')).getText();
    }

    prestartCheckConfigSelectLastOption(): promise.Promise<void> {
        return this.prestartCheckConfigSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    prestartCheckConfigSelectOption(option): promise.Promise<void> {
        return this.prestartCheckConfigSelect.sendKeys(option);
    }

    getPrestartCheckConfigSelect(): ElementFinder {
        return this.prestartCheckConfigSelect;
    }

    getPrestartCheckConfigSelectedOption() {
        return this.prestartCheckConfigSelect.element(by.css('option:checked')).getText();
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
