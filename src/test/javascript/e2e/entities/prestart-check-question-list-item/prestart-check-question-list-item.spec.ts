import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    PrestartCheckQuestionListItemComponentsPage,
    PrestartCheckQuestionListItemUpdatePage
} from './prestart-check-question-list-item.page-object';

describe('PrestartCheckQuestionListItem e2e test', () => {
    let navBarPage: NavBarPage;
    let prestartCheckQuestionListItemUpdatePage: PrestartCheckQuestionListItemUpdatePage;
    let prestartCheckQuestionListItemComponentsPage: PrestartCheckQuestionListItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PrestartCheckQuestionListItems', () => {
        navBarPage.goToEntity('prestart-check-question-list-item');
        prestartCheckQuestionListItemComponentsPage = new PrestartCheckQuestionListItemComponentsPage();
        expect(prestartCheckQuestionListItemComponentsPage.getTitle()).toMatch(/prestartApp.prestartCheckQuestionListItem.home.title/);
    });

    it('should load create PrestartCheckQuestionListItem page', () => {
        prestartCheckQuestionListItemComponentsPage.clickOnCreateButton();
        prestartCheckQuestionListItemUpdatePage = new PrestartCheckQuestionListItemUpdatePage();
        expect(prestartCheckQuestionListItemUpdatePage.getPageTitle()).toMatch(
            /prestartApp.prestartCheckQuestionListItem.home.createOrEditLabel/
        );
        prestartCheckQuestionListItemUpdatePage.cancel();
    });

    it('should create and save PrestartCheckQuestionListItems', () => {
        prestartCheckQuestionListItemComponentsPage.clickOnCreateButton();
        prestartCheckQuestionListItemUpdatePage.setOrderInput('5');
        expect(prestartCheckQuestionListItemUpdatePage.getOrderInput()).toMatch('5');
        prestartCheckQuestionListItemUpdatePage.prestartCheckConfigSelectLastOption();
        prestartCheckQuestionListItemUpdatePage.questionSelectLastOption();
        prestartCheckQuestionListItemUpdatePage.save();
        expect(prestartCheckQuestionListItemUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
