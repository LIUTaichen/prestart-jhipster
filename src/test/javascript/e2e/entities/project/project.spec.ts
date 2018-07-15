import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ProjectComponentsPage, ProjectUpdatePage } from './project.page-object';

describe('Project e2e test', () => {
    let navBarPage: NavBarPage;
    let projectUpdatePage: ProjectUpdatePage;
    let projectComponentsPage: ProjectComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Projects', () => {
        navBarPage.goToEntity('project');
        projectComponentsPage = new ProjectComponentsPage();
        expect(projectComponentsPage.getTitle()).toMatch(/prestartApp.project.home.title/);
    });

    it('should load create Project page', () => {
        projectComponentsPage.clickOnCreateButton();
        projectUpdatePage = new ProjectUpdatePage();
        expect(projectUpdatePage.getPageTitle()).toMatch(/prestartApp.project.home.createOrEditLabel/);
        projectUpdatePage.cancel();
    });

    it('should create and save Projects', () => {
        projectComponentsPage.clickOnCreateButton();
        projectUpdatePage.setJobNoInput('jobNo');
        expect(projectUpdatePage.getJobNoInput()).toMatch('jobNo');
        projectUpdatePage.setNameInput('name');
        expect(projectUpdatePage.getNameInput()).toMatch('name');
        projectUpdatePage.setLocationInput('location');
        expect(projectUpdatePage.getLocationInput()).toMatch('location');
        projectUpdatePage.setNotesInput('notes');
        expect(projectUpdatePage.getNotesInput()).toMatch('notes');
        projectUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(projectUpdatePage.getStartDateInput()).toContain('2001-01-01T02:30');
        projectUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(projectUpdatePage.getEndDateInput()).toContain('2001-01-01T02:30');
        projectUpdatePage
            .getIsActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    projectUpdatePage.getIsActiveInput().click();
                    expect(projectUpdatePage.getIsActiveInput().isSelected()).toBeFalsy();
                } else {
                    projectUpdatePage.getIsActiveInput().click();
                    expect(projectUpdatePage.getIsActiveInput().isSelected()).toBeTruthy();
                }
            });
        projectUpdatePage
            .getIsOnHoldInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    projectUpdatePage.getIsOnHoldInput().click();
                    expect(projectUpdatePage.getIsOnHoldInput().isSelected()).toBeFalsy();
                } else {
                    projectUpdatePage.getIsOnHoldInput().click();
                    expect(projectUpdatePage.getIsOnHoldInput().isSelected()).toBeTruthy();
                }
            });
        projectUpdatePage.setDetailsInput('details');
        expect(projectUpdatePage.getDetailsInput()).toMatch('details');
        projectUpdatePage.save();
        expect(projectUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
