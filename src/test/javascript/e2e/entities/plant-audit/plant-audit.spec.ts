import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PlantAuditComponentsPage, PlantAuditUpdatePage } from './plant-audit.page-object';

describe('PlantAudit e2e test', () => {
    let navBarPage: NavBarPage;
    let plantAuditUpdatePage: PlantAuditUpdatePage;
    let plantAuditComponentsPage: PlantAuditComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PlantAudits', () => {
        navBarPage.goToEntity('plant-audit');
        plantAuditComponentsPage = new PlantAuditComponentsPage();
        expect(plantAuditComponentsPage.getTitle()).toMatch(/prestartApp.plantAudit.home.title/);
    });

    it('should load create PlantAudit page', () => {
        plantAuditComponentsPage.clickOnCreateButton();
        plantAuditUpdatePage = new PlantAuditUpdatePage();
        expect(plantAuditUpdatePage.getPageTitle()).toMatch(/prestartApp.plantAudit.home.createOrEditLabel/);
        plantAuditUpdatePage.cancel();
    });

    it('should create and save PlantAudits', () => {
        plantAuditComponentsPage.clickOnCreateButton();
        plantAuditUpdatePage.setNotesInput('notes');
        expect(plantAuditUpdatePage.getNotesInput()).toMatch('notes');
        plantAuditUpdatePage
            .getTyreOrTrackOrRollerFrontLeftInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerFrontLeftInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerFrontLeftInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerFrontLeftInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerFrontLeftInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getTyreOrTrackOrRollerFrontRightInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerFrontRightInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerFrontRightInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerFrontRightInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerFrontRightInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getControlLeftInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getControlLeftInput().click();
                    expect(plantAuditUpdatePage.getControlLeftInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getControlLeftInput().click();
                    expect(plantAuditUpdatePage.getControlLeftInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getControlRightInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getControlRightInput().click();
                    expect(plantAuditUpdatePage.getControlRightInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getControlRightInput().click();
                    expect(plantAuditUpdatePage.getControlRightInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getTyreOrTrackOrRollerRearLeftInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerRearLeftInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerRearLeftInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerRearLeftInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerRearLeftInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getTyreOrTrackOrRollerRearRightInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerRearRightInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerRearRightInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getTyreOrTrackOrRollerRearRightInput().click();
                    expect(plantAuditUpdatePage.getTyreOrTrackOrRollerRearRightInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getDriveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getDriveInput().click();
                    expect(plantAuditUpdatePage.getDriveInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getDriveInput().click();
                    expect(plantAuditUpdatePage.getDriveInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getSteeringLeftInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getSteeringLeftInput().click();
                    expect(plantAuditUpdatePage.getSteeringLeftInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getSteeringLeftInput().click();
                    expect(plantAuditUpdatePage.getSteeringLeftInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getSteeringRightInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getSteeringRightInput().click();
                    expect(plantAuditUpdatePage.getSteeringRightInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getSteeringRightInput().click();
                    expect(plantAuditUpdatePage.getSteeringRightInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getHoistLeftInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getHoistLeftInput().click();
                    expect(plantAuditUpdatePage.getHoistLeftInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getHoistLeftInput().click();
                    expect(plantAuditUpdatePage.getHoistLeftInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getHoistRightInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getHoistRightInput().click();
                    expect(plantAuditUpdatePage.getHoistRightInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getHoistRightInput().click();
                    expect(plantAuditUpdatePage.getHoistRightInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getEjectorInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getEjectorInput().click();
                    expect(plantAuditUpdatePage.getEjectorInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getEjectorInput().click();
                    expect(plantAuditUpdatePage.getEjectorInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getOilLevelInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getOilLevelInput().click();
                    expect(plantAuditUpdatePage.getOilLevelInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getOilLevelInput().click();
                    expect(plantAuditUpdatePage.getOilLevelInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getCoolantInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getCoolantInput().click();
                    expect(plantAuditUpdatePage.getCoolantInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getCoolantInput().click();
                    expect(plantAuditUpdatePage.getCoolantInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getHydraulicsInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getHydraulicsInput().click();
                    expect(plantAuditUpdatePage.getHydraulicsInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getHydraulicsInput().click();
                    expect(plantAuditUpdatePage.getHydraulicsInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getCabInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getCabInput().click();
                    expect(plantAuditUpdatePage.getCabInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getCabInput().click();
                    expect(plantAuditUpdatePage.getCabInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getBonnetInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getBonnetInput().click();
                    expect(plantAuditUpdatePage.getBonnetInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getBonnetInput().click();
                    expect(plantAuditUpdatePage.getBonnetInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getBodyInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getBodyInput().click();
                    expect(plantAuditUpdatePage.getBodyInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getBodyInput().click();
                    expect(plantAuditUpdatePage.getBodyInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getBinFrontInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getBinFrontInput().click();
                    expect(plantAuditUpdatePage.getBinFrontInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getBinFrontInput().click();
                    expect(plantAuditUpdatePage.getBinFrontInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getBinLeftInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getBinLeftInput().click();
                    expect(plantAuditUpdatePage.getBinLeftInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getBinLeftInput().click();
                    expect(plantAuditUpdatePage.getBinLeftInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getBinRightInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getBinRightInput().click();
                    expect(plantAuditUpdatePage.getBinRightInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getBinRightInput().click();
                    expect(plantAuditUpdatePage.getBinRightInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getBinInsideInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getBinInsideInput().click();
                    expect(plantAuditUpdatePage.getBinInsideInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getBinInsideInput().click();
                    expect(plantAuditUpdatePage.getBinInsideInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getTailGateInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getTailGateInput().click();
                    expect(plantAuditUpdatePage.getTailGateInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getTailGateInput().click();
                    expect(plantAuditUpdatePage.getTailGateInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getLeftGuardInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getLeftGuardInput().click();
                    expect(plantAuditUpdatePage.getLeftGuardInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getLeftGuardInput().click();
                    expect(plantAuditUpdatePage.getLeftGuardInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getLeftStairsInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getLeftStairsInput().click();
                    expect(plantAuditUpdatePage.getLeftStairsInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getLeftStairsInput().click();
                    expect(plantAuditUpdatePage.getLeftStairsInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getRightGuardInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getRightGuardInput().click();
                    expect(plantAuditUpdatePage.getRightGuardInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getRightGuardInput().click();
                    expect(plantAuditUpdatePage.getRightGuardInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage
            .getRightStairsInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    plantAuditUpdatePage.getRightStairsInput().click();
                    expect(plantAuditUpdatePage.getRightStairsInput().isSelected()).toBeFalsy();
                } else {
                    plantAuditUpdatePage.getRightStairsInput().click();
                    expect(plantAuditUpdatePage.getRightStairsInput().isSelected()).toBeTruthy();
                }
            });
        plantAuditUpdatePage.incidenTypeSelectLastOption();
        plantAuditUpdatePage.plantLogSelectLastOption();
        plantAuditUpdatePage.save();
        expect(plantAuditUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
