import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CompanyComponentsPage, CompanyUpdatePage } from './company.page-object';

describe('Company e2e test', () => {
    let navBarPage: NavBarPage;
    let companyUpdatePage: CompanyUpdatePage;
    let companyComponentsPage: CompanyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Companies', () => {
        navBarPage.goToEntity('company');
        companyComponentsPage = new CompanyComponentsPage();
        expect(companyComponentsPage.getTitle()).toMatch(/prestartApp.company.home.title/);
    });

    it('should load create Company page', () => {
        companyComponentsPage.clickOnCreateButton();
        companyUpdatePage = new CompanyUpdatePage();
        expect(companyUpdatePage.getPageTitle()).toMatch(/prestartApp.company.home.createOrEditLabel/);
        companyUpdatePage.cancel();
    });

    it('should create and save Companies', () => {
        companyComponentsPage.clickOnCreateButton();
        companyUpdatePage.setCompanyInput('company');
        expect(companyUpdatePage.getCompanyInput()).toMatch('company');
        companyUpdatePage.setPhoneInput('phone');
        expect(companyUpdatePage.getPhoneInput()).toMatch('phone');
        companyUpdatePage.setAddressInput('address');
        expect(companyUpdatePage.getAddressInput()).toMatch('address');
        companyUpdatePage.setLocationInput('location');
        expect(companyUpdatePage.getLocationInput()).toMatch('location');
        companyUpdatePage.setWebPageInput('webPage');
        expect(companyUpdatePage.getWebPageInput()).toMatch('webPage');
        companyUpdatePage.setNotesInput('notes');
        expect(companyUpdatePage.getNotesInput()).toMatch('notes');
        companyUpdatePage
            .getIsActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    companyUpdatePage.getIsActiveInput().click();
                    expect(companyUpdatePage.getIsActiveInput().isSelected()).toBeFalsy();
                } else {
                    companyUpdatePage.getIsActiveInput().click();
                    expect(companyUpdatePage.getIsActiveInput().isSelected()).toBeTruthy();
                }
            });
        companyUpdatePage.setAbbreviationInput('abbreviation');
        expect(companyUpdatePage.getAbbreviationInput()).toMatch('abbreviation');
        companyUpdatePage.save();
        expect(companyUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
