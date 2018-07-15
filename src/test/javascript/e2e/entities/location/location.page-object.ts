import { element, by, promise, ElementFinder } from 'protractor';

export class LocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-location div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LocationUpdatePage {
    pageTitle = element(by.id('jhi-location-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    latitudeInput = element(by.id('field_latitude'));
    longitudeInput = element(by.id('field_longitude'));
    addressInput = element(by.id('field_address'));
    bearingInput = element(by.id('field_bearing'));
    directionInput = element(by.id('field_direction'));
    speedInput = element(by.id('field_speed'));
    timestampInput = element(by.id('field_timestamp'));
    providerInput = element(by.id('field_provider'));
    projectSelect = element(by.id('field_project'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setLatitudeInput(latitude): promise.Promise<void> {
        return this.latitudeInput.sendKeys(latitude);
    }

    getLatitudeInput() {
        return this.latitudeInput.getAttribute('value');
    }

    setLongitudeInput(longitude): promise.Promise<void> {
        return this.longitudeInput.sendKeys(longitude);
    }

    getLongitudeInput() {
        return this.longitudeInput.getAttribute('value');
    }

    setAddressInput(address): promise.Promise<void> {
        return this.addressInput.sendKeys(address);
    }

    getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    setBearingInput(bearing): promise.Promise<void> {
        return this.bearingInput.sendKeys(bearing);
    }

    getBearingInput() {
        return this.bearingInput.getAttribute('value');
    }

    setDirectionInput(direction): promise.Promise<void> {
        return this.directionInput.sendKeys(direction);
    }

    getDirectionInput() {
        return this.directionInput.getAttribute('value');
    }

    setSpeedInput(speed): promise.Promise<void> {
        return this.speedInput.sendKeys(speed);
    }

    getSpeedInput() {
        return this.speedInput.getAttribute('value');
    }

    setTimestampInput(timestamp): promise.Promise<void> {
        return this.timestampInput.sendKeys(timestamp);
    }

    getTimestampInput() {
        return this.timestampInput.getAttribute('value');
    }

    setProviderInput(provider): promise.Promise<void> {
        return this.providerInput.sendKeys(provider);
    }

    getProviderInput() {
        return this.providerInput.getAttribute('value');
    }

    projectSelectLastOption(): promise.Promise<void> {
        return this.projectSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    projectSelectOption(option): promise.Promise<void> {
        return this.projectSelect.sendKeys(option);
    }

    getProjectSelect(): ElementFinder {
        return this.projectSelect;
    }

    getProjectSelectedOption() {
        return this.projectSelect.element(by.css('option:checked')).getText();
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
