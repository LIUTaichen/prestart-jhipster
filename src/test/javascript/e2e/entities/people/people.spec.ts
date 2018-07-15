import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PeopleComponentsPage, PeopleUpdatePage } from './people.page-object';

describe('People e2e test', () => {
    let navBarPage: NavBarPage;
    let peopleUpdatePage: PeopleUpdatePage;
    let peopleComponentsPage: PeopleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load People', () => {
        navBarPage.goToEntity('people');
        peopleComponentsPage = new PeopleComponentsPage();
        expect(peopleComponentsPage.getTitle()).toMatch(/prestartApp.people.home.title/);
    });

    it('should load create People page', () => {
        peopleComponentsPage.clickOnCreateButton();
        peopleUpdatePage = new PeopleUpdatePage();
        expect(peopleUpdatePage.getPageTitle()).toMatch(/prestartApp.people.home.createOrEditLabel/);
        peopleUpdatePage.cancel();
    });

    it('should create and save People', () => {
        peopleComponentsPage.clickOnCreateButton();
        peopleUpdatePage.setEmailInput('email');
        expect(peopleUpdatePage.getEmailInput()).toMatch('email');
        peopleUpdatePage.setPhoneInput('phone');
        expect(peopleUpdatePage.getPhoneInput()).toMatch('phone');
        peopleUpdatePage.setNameInput('name');
        expect(peopleUpdatePage.getNameInput()).toMatch('name');
        peopleUpdatePage.save();
        expect(peopleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
