import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CategoryComponentsPage, CategoryUpdatePage } from './category.page-object';

describe('Category e2e test', () => {
    let navBarPage: NavBarPage;
    let categoryUpdatePage: CategoryUpdatePage;
    let categoryComponentsPage: CategoryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Categories', () => {
        navBarPage.goToEntity('category');
        categoryComponentsPage = new CategoryComponentsPage();
        expect(categoryComponentsPage.getTitle()).toMatch(/prestartApp.category.home.title/);
    });

    it('should load create Category page', () => {
        categoryComponentsPage.clickOnCreateButton();
        categoryUpdatePage = new CategoryUpdatePage();
        expect(categoryUpdatePage.getPageTitle()).toMatch(/prestartApp.category.home.createOrEditLabel/);
        categoryUpdatePage.cancel();
    });

    it('should create and save Categories', () => {
        categoryComponentsPage.clickOnCreateButton();
        categoryUpdatePage.setCategoryInput('category');
        expect(categoryUpdatePage.getCategoryInput()).toMatch('category');
        categoryUpdatePage.setDescriptionInput('description');
        expect(categoryUpdatePage.getDescriptionInput()).toMatch('description');
        categoryUpdatePage.setTypeInput('type');
        expect(categoryUpdatePage.getTypeInput()).toMatch('type');
        categoryUpdatePage
            .getTrackUsageInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    categoryUpdatePage.getTrackUsageInput().click();
                    expect(categoryUpdatePage.getTrackUsageInput().isSelected()).toBeFalsy();
                } else {
                    categoryUpdatePage.getTrackUsageInput().click();
                    expect(categoryUpdatePage.getTrackUsageInput().isSelected()).toBeTruthy();
                }
            });
        categoryUpdatePage.setDailyRateInput('5');
        expect(categoryUpdatePage.getDailyRateInput()).toMatch('5');
        categoryUpdatePage.setLoadCapacityInput('5');
        expect(categoryUpdatePage.getLoadCapacityInput()).toMatch('5');
        categoryUpdatePage.setHourlyRateInput('5');
        expect(categoryUpdatePage.getHourlyRateInput()).toMatch('5');
        categoryUpdatePage
            .getIsEarchMovingPlantInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    categoryUpdatePage.getIsEarchMovingPlantInput().click();
                    expect(categoryUpdatePage.getIsEarchMovingPlantInput().isSelected()).toBeFalsy();
                } else {
                    categoryUpdatePage.getIsEarchMovingPlantInput().click();
                    expect(categoryUpdatePage.getIsEarchMovingPlantInput().isSelected()).toBeTruthy();
                }
            });
        categoryUpdatePage
            .getIsTrackedForInternalBillingInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    categoryUpdatePage.getIsTrackedForInternalBillingInput().click();
                    expect(categoryUpdatePage.getIsTrackedForInternalBillingInput().isSelected()).toBeFalsy();
                } else {
                    categoryUpdatePage.getIsTrackedForInternalBillingInput().click();
                    expect(categoryUpdatePage.getIsTrackedForInternalBillingInput().isSelected()).toBeTruthy();
                }
            });
        categoryUpdatePage.maintenanceGroupSelectLastOption();
        categoryUpdatePage.competencySelectLastOption();
        categoryUpdatePage.prestartCheckConfigSelectLastOption();
        categoryUpdatePage.save();
        expect(categoryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
