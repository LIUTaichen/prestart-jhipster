import { element, by, promise, ElementFinder } from 'protractor';

export class PlantAuditComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-plant-audit div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlantAuditUpdatePage {
    pageTitle = element(by.id('jhi-plant-audit-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    notesInput = element(by.id('field_notes'));
    tyreOrTrackOrRollerFrontLeftInput = element(by.id('field_tyreOrTrackOrRollerFrontLeft'));
    tyreOrTrackOrRollerFrontRightInput = element(by.id('field_tyreOrTrackOrRollerFrontRight'));
    controlLeftInput = element(by.id('field_controlLeft'));
    controlRightInput = element(by.id('field_controlRight'));
    tyreOrTrackOrRollerRearLeftInput = element(by.id('field_tyreOrTrackOrRollerRearLeft'));
    tyreOrTrackOrRollerRearRightInput = element(by.id('field_tyreOrTrackOrRollerRearRight'));
    driveInput = element(by.id('field_drive'));
    steeringLeftInput = element(by.id('field_steeringLeft'));
    steeringRightInput = element(by.id('field_steeringRight'));
    hoistLeftInput = element(by.id('field_hoistLeft'));
    hoistRightInput = element(by.id('field_hoistRight'));
    ejectorInput = element(by.id('field_ejector'));
    oilLevelInput = element(by.id('field_oilLevel'));
    coolantInput = element(by.id('field_coolant'));
    hydraulicsInput = element(by.id('field_hydraulics'));
    cabInput = element(by.id('field_cab'));
    bonnetInput = element(by.id('field_bonnet'));
    bodyInput = element(by.id('field_body'));
    binFrontInput = element(by.id('field_binFront'));
    binLeftInput = element(by.id('field_binLeft'));
    binRightInput = element(by.id('field_binRight'));
    binInsideInput = element(by.id('field_binInside'));
    tailGateInput = element(by.id('field_tailGate'));
    leftGuardInput = element(by.id('field_leftGuard'));
    leftStairsInput = element(by.id('field_leftStairs'));
    rightGuardInput = element(by.id('field_rightGuard'));
    rightStairsInput = element(by.id('field_rightStairs'));
    incidenTypeSelect = element(by.id('field_incidenType'));
    plantLogSelect = element(by.id('field_plantLog'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNotesInput(notes): promise.Promise<void> {
        return this.notesInput.sendKeys(notes);
    }

    getNotesInput() {
        return this.notesInput.getAttribute('value');
    }

    getTyreOrTrackOrRollerFrontLeftInput() {
        return this.tyreOrTrackOrRollerFrontLeftInput;
    }
    getTyreOrTrackOrRollerFrontRightInput() {
        return this.tyreOrTrackOrRollerFrontRightInput;
    }
    getControlLeftInput() {
        return this.controlLeftInput;
    }
    getControlRightInput() {
        return this.controlRightInput;
    }
    getTyreOrTrackOrRollerRearLeftInput() {
        return this.tyreOrTrackOrRollerRearLeftInput;
    }
    getTyreOrTrackOrRollerRearRightInput() {
        return this.tyreOrTrackOrRollerRearRightInput;
    }
    getDriveInput() {
        return this.driveInput;
    }
    getSteeringLeftInput() {
        return this.steeringLeftInput;
    }
    getSteeringRightInput() {
        return this.steeringRightInput;
    }
    getHoistLeftInput() {
        return this.hoistLeftInput;
    }
    getHoistRightInput() {
        return this.hoistRightInput;
    }
    getEjectorInput() {
        return this.ejectorInput;
    }
    getOilLevelInput() {
        return this.oilLevelInput;
    }
    getCoolantInput() {
        return this.coolantInput;
    }
    getHydraulicsInput() {
        return this.hydraulicsInput;
    }
    getCabInput() {
        return this.cabInput;
    }
    getBonnetInput() {
        return this.bonnetInput;
    }
    getBodyInput() {
        return this.bodyInput;
    }
    getBinFrontInput() {
        return this.binFrontInput;
    }
    getBinLeftInput() {
        return this.binLeftInput;
    }
    getBinRightInput() {
        return this.binRightInput;
    }
    getBinInsideInput() {
        return this.binInsideInput;
    }
    getTailGateInput() {
        return this.tailGateInput;
    }
    getLeftGuardInput() {
        return this.leftGuardInput;
    }
    getLeftStairsInput() {
        return this.leftStairsInput;
    }
    getRightGuardInput() {
        return this.rightGuardInput;
    }
    getRightStairsInput() {
        return this.rightStairsInput;
    }
    setIncidenTypeSelect(incidenType): promise.Promise<void> {
        return this.incidenTypeSelect.sendKeys(incidenType);
    }

    getIncidenTypeSelect() {
        return this.incidenTypeSelect.element(by.css('option:checked')).getText();
    }

    incidenTypeSelectLastOption(): promise.Promise<void> {
        return this.incidenTypeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }
    plantLogSelectLastOption(): promise.Promise<void> {
        return this.plantLogSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    plantLogSelectOption(option): promise.Promise<void> {
        return this.plantLogSelect.sendKeys(option);
    }

    getPlantLogSelect(): ElementFinder {
        return this.plantLogSelect;
    }

    getPlantLogSelectedOption() {
        return this.plantLogSelect.element(by.css('option:checked')).getText();
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
