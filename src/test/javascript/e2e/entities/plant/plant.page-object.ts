import { element, by, promise, ElementFinder } from 'protractor';

export class PlantComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-plant div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlantUpdatePage {
    pageTitle = element(by.id('jhi-plant-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    fleetIdInput = element(by.id('field_fleetId'));
    nameInput = element(by.id('field_name'));
    notesInput = element(by.id('field_notes'));
    purchaseDateInput = element(by.id('field_purchaseDate'));
    isActiveInput = element(by.id('field_isActive'));
    descriptionInput = element(by.id('field_description'));
    vinInput = element(by.id('field_vin'));
    regoInput = element(by.id('field_rego'));
    dateOfManufactureInput = element(by.id('field_dateOfManufacture'));
    imageInput = element(by.id('file_image'));
    tankSizeInput = element(by.id('field_tankSize'));
    meterReadingInput = element(by.id('field_meterReading'));
    maintenanceDueAtInput = element(by.id('field_maintenanceDueAt'));
    maintenanceDueDateInput = element(by.id('field_maintenanceDueDate'));
    meterUnitSelect = element(by.id('field_meterUnit'));
    certificateDueDateInput = element(by.id('field_certificateDueDate'));
    rucDueAtKmInput = element(by.id('field_rucDueAtKm'));
    hubboReadingInput = element(by.id('field_hubboReading'));
    loadCapacityInput = element(by.id('field_loadCapacity'));
    hourlyRateInput = element(by.id('field_hourlyRate'));
    registrationDueDateInput = element(by.id('field_registrationDueDate'));
    hireStatusSelect = element(by.id('field_hireStatus'));
    gpsDeviceSerialInput = element(by.id('field_gpsDeviceSerial'));
    maintenanceTypeSelect = element(by.id('field_maintenanceType'));
    locationSelect = element(by.id('field_location'));
    categorySelect = element(by.id('field_category'));
    ownerSelect = element(by.id('field_owner'));
    assignedContractorSelect = element(by.id('field_assignedContractor'));
    projectSelect = element(by.id('field_project'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setFleetIdInput(fleetId): promise.Promise<void> {
        return this.fleetIdInput.sendKeys(fleetId);
    }

    getFleetIdInput() {
        return this.fleetIdInput.getAttribute('value');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
    }

    setPurchaseDateInput(purchaseDate): promise.Promise<void> {
        return this.purchaseDateInput.sendKeys(purchaseDate);
    }

    getPurchaseDateInput() {
        return this.purchaseDateInput.getAttribute('value');
    }

    getIsActiveInput() {
        return this.isActiveInput;
    }
    setDescriptionInput(description): promise.Promise<void> {
        return this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    setVinInput(vin): promise.Promise<void> {
        return this.vinInput.sendKeys(vin);
    }

    getVinInput() {
        return this.vinInput.getAttribute('value');
    }

    setRegoInput(rego): promise.Promise<void> {
        return this.regoInput.sendKeys(rego);
    }

    getRegoInput() {
        return this.regoInput.getAttribute('value');
    }

    setDateOfManufactureInput(dateOfManufacture): promise.Promise<void> {
        return this.dateOfManufactureInput.sendKeys(dateOfManufacture);
    }

    getDateOfManufactureInput() {
        return this.dateOfManufactureInput.getAttribute('value');
    }

    setImageInput(image): promise.Promise<void> {
        return this.imageInput.sendKeys(image);
    }

    getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    setTankSizeInput(tankSize): promise.Promise<void> {
        return this.tankSizeInput.sendKeys(tankSize);
    }

    getTankSizeInput() {
        return this.tankSizeInput.getAttribute('value');
    }

    setMeterReadingInput(meterReading): promise.Promise<void> {
        return this.meterReadingInput.sendKeys(meterReading);
    }

    getMeterReadingInput() {
        return this.meterReadingInput.getAttribute('value');
    }

    setMaintenanceDueAtInput(maintenanceDueAt): promise.Promise<void> {
        return this.maintenanceDueAtInput.sendKeys(maintenanceDueAt);
    }

    getMaintenanceDueAtInput() {
        return this.maintenanceDueAtInput.getAttribute('value');
    }

    setMaintenanceDueDateInput(maintenanceDueDate): promise.Promise<void> {
        return this.maintenanceDueDateInput.sendKeys(maintenanceDueDate);
    }

    getMaintenanceDueDateInput() {
        return this.maintenanceDueDateInput.getAttribute('value');
    }

    setMeterUnitSelect(meterUnit): promise.Promise<void> {
        return this.meterUnitSelect.sendKeys(meterUnit);
    }

    getMeterUnitSelect() {
        return this.meterUnitSelect.element(by.css('option:checked')).getText();
    }

    meterUnitSelectLastOption(): promise.Promise<void> {
        return this.meterUnitSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setCertificateDueDateInput(certificateDueDate): promise.Promise<void> {
        return this.certificateDueDateInput.sendKeys(certificateDueDate);
    }

    getCertificateDueDateInput() {
        return this.certificateDueDateInput.getAttribute('value');
    }

    setRucDueAtKmInput(rucDueAtKm): promise.Promise<void> {
        return this.rucDueAtKmInput.sendKeys(rucDueAtKm);
    }

    getRucDueAtKmInput() {
        return this.rucDueAtKmInput.getAttribute('value');
    }

    setHubboReadingInput(hubboReading): promise.Promise<void> {
        return this.hubboReadingInput.sendKeys(hubboReading);
    }

    getHubboReadingInput() {
        return this.hubboReadingInput.getAttribute('value');
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

    setRegistrationDueDateInput(registrationDueDate): promise.Promise<void> {
        return this.registrationDueDateInput.sendKeys(registrationDueDate);
    }

    getRegistrationDueDateInput() {
        return this.registrationDueDateInput.getAttribute('value');
    }

    setHireStatusSelect(hireStatus): promise.Promise<void> {
        return this.hireStatusSelect.sendKeys(hireStatus);
    }

    getHireStatusSelect() {
        return this.hireStatusSelect.element(by.css('option:checked')).getText();
    }

    hireStatusSelectLastOption(): promise.Promise<void> {
        return this.hireStatusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    setGpsDeviceSerialInput(gpsDeviceSerial): promise.Promise<void> {
        return this.gpsDeviceSerialInput.sendKeys(gpsDeviceSerial);
    }

    getGpsDeviceSerialInput() {
        return this.gpsDeviceSerialInput.getAttribute('value');
    }

    setMaintenanceTypeSelect(maintenanceType): promise.Promise<void> {
        return this.maintenanceTypeSelect.sendKeys(maintenanceType);
    }

    getMaintenanceTypeSelect() {
        return this.maintenanceTypeSelect.element(by.css('option:checked')).getText();
    }

    maintenanceTypeSelectLastOption(): promise.Promise<void> {
        return this.maintenanceTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    locationSelectLastOption(): promise.Promise<void> {
        return this.locationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    locationSelectOption(option): promise.Promise<void> {
        return this.locationSelect.sendKeys(option);
    }

    getLocationSelect(): ElementFinder {
        return this.locationSelect;
    }

    getLocationSelectedOption() {
        return this.locationSelect.element(by.css('option:checked')).getText();
    }

    categorySelectLastOption(): promise.Promise<void> {
        return this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    categorySelectOption(option): promise.Promise<void> {
        return this.categorySelect.sendKeys(option);
    }

    getCategorySelect(): ElementFinder {
        return this.categorySelect;
    }

    getCategorySelectedOption() {
        return this.categorySelect.element(by.css('option:checked')).getText();
    }

    ownerSelectLastOption(): promise.Promise<void> {
        return this.ownerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    ownerSelectOption(option): promise.Promise<void> {
        return this.ownerSelect.sendKeys(option);
    }

    getOwnerSelect(): ElementFinder {
        return this.ownerSelect;
    }

    getOwnerSelectedOption() {
        return this.ownerSelect.element(by.css('option:checked')).getText();
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
