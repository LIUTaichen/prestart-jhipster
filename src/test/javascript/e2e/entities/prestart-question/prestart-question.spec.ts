import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PrestartQuestionComponentsPage, PrestartQuestionUpdatePage } from './prestart-question.page-object';

describe('PrestartQuestion e2e test', () => {
    let navBarPage: NavBarPage;
    let prestartQuestionUpdatePage: PrestartQuestionUpdatePage;
    let prestartQuestionComponentsPage: PrestartQuestionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrestartQuestions', () => {
        navBarPage.goToEntity('prestart-question');
        prestartQuestionComponentsPage = new PrestartQuestionComponentsPage();
        expect(prestartQuestionComponentsPage.getTitle()).toMatch(/prestartApp.prestartQuestion.home.title/);
    });

    it('should load create PrestartQuestion page', () => {
        prestartQuestionComponentsPage.clickOnCreateButton();
        prestartQuestionUpdatePage = new PrestartQuestionUpdatePage();
        expect(prestartQuestionUpdatePage.getPageTitle()).toMatch(/prestartApp.prestartQuestion.home.createOrEditLabel/);
        prestartQuestionUpdatePage.cancel();
    });

    it('should create and save PrestartQuestions', () => {
        prestartQuestionComponentsPage.clickOnCreateButton();
        prestartQuestionUpdatePage.setBodyInput('body');
        expect(prestartQuestionUpdatePage.getBodyInput()).toMatch('body');
        prestartQuestionUpdatePage
            .getIsLockOutRequiredInput()
            .isSelected()
            .then(selected => {
                if (selected) {
                    prestartQuestionUpdatePage.getIsLockOutRequiredInput().click();
                    expect(prestartQuestionUpdatePage.getIsLockOutRequiredInput().isSelected()).toBeFalsy();
                } else {
                    prestartQuestionUpdatePage.getIsLockOutRequiredInput().click();
                    expect(prestartQuestionUpdatePage.getIsLockOutRequiredInput().isSelected()).toBeTruthy();
                }
            });
        prestartQuestionUpdatePage.setOrderInput('5');
        expect(prestartQuestionUpdatePage.getOrderInput()).toMatch('5');
        prestartQuestionUpdatePage.prestartCheckConfigSelectLastOption();
        prestartQuestionUpdatePage.save();
        expect(prestartQuestionUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
