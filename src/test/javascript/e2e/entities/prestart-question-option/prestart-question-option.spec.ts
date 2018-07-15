import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PrestartQuestionOptionComponentsPage, PrestartQuestionOptionUpdatePage } from './prestart-question-option.page-object';

describe('PrestartQuestionOption e2e test', () => {
    let navBarPage: NavBarPage;
    let prestartQuestionOptionUpdatePage: PrestartQuestionOptionUpdatePage;
    let prestartQuestionOptionComponentsPage: PrestartQuestionOptionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrestartQuestionOptions', () => {
        navBarPage.goToEntity('prestart-question-option');
        prestartQuestionOptionComponentsPage = new PrestartQuestionOptionComponentsPage();
        expect(prestartQuestionOptionComponentsPage.getTitle()).toMatch(/prestartApp.prestartQuestionOption.home.title/);
    });

    it('should load create PrestartQuestionOption page', () => {
        prestartQuestionOptionComponentsPage.clickOnCreateButton();
        prestartQuestionOptionUpdatePage = new PrestartQuestionOptionUpdatePage();
        expect(prestartQuestionOptionUpdatePage.getPageTitle()).toMatch(/prestartApp.prestartQuestionOption.home.createOrEditLabel/);
        prestartQuestionOptionUpdatePage.cancel();
    });

    it('should create and save PrestartQuestionOptions', () => {
        prestartQuestionOptionComponentsPage.clickOnCreateButton();
        prestartQuestionOptionUpdatePage.setBodyInput('body');
        expect(prestartQuestionOptionUpdatePage.getBodyInput()).toMatch('body');
        prestartQuestionOptionUpdatePage
            .getIsNormalInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    prestartQuestionOptionUpdatePage.getIsNormalInput().click();
                    expect(prestartQuestionOptionUpdatePage.getIsNormalInput().isSelected()).toBeFalsy();
                } else {
                    prestartQuestionOptionUpdatePage.getIsNormalInput().click();
                    expect(prestartQuestionOptionUpdatePage.getIsNormalInput().isSelected()).toBeTruthy();
                }
            });
        prestartQuestionOptionUpdatePage
            .getIsActiveInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    prestartQuestionOptionUpdatePage.getIsActiveInput().click();
                    expect(prestartQuestionOptionUpdatePage.getIsActiveInput().isSelected()).toBeFalsy();
                } else {
                    prestartQuestionOptionUpdatePage.getIsActiveInput().click();
                    expect(prestartQuestionOptionUpdatePage.getIsActiveInput().isSelected()).toBeTruthy();
                }
            });
        prestartQuestionOptionUpdatePage.questionSelectLastOption();
        prestartQuestionOptionUpdatePage.save();
        expect(prestartQuestionOptionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
