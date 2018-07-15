import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LocationComponentsPage, LocationUpdatePage } from './location.page-object';

describe('Location e2e test', () => {
    let navBarPage: NavBarPage;
    let locationUpdatePage: LocationUpdatePage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locations', () => {
        navBarPage.goToEntity('location');
        locationComponentsPage = new LocationComponentsPage();
        expect(locationComponentsPage.getTitle()).toMatch(/prestartApp.location.home.title/);
    });

    it('should load create Location page', () => {
        locationComponentsPage.clickOnCreateButton();
        locationUpdatePage = new LocationUpdatePage();
        expect(locationUpdatePage.getPageTitle()).toMatch(/prestartApp.location.home.createOrEditLabel/);
        locationUpdatePage.cancel();
    });

    it('should create and save Locations', () => {
        locationComponentsPage.clickOnCreateButton();
        locationUpdatePage.setLatitudeInput('5');
        expect(locationUpdatePage.getLatitudeInput()).toMatch('5');
        locationUpdatePage.setLongitudeInput('5');
        expect(locationUpdatePage.getLongitudeInput()).toMatch('5');
        locationUpdatePage.setAddressInput('address');
        expect(locationUpdatePage.getAddressInput()).toMatch('address');
        locationUpdatePage.setBearingInput('5');
        expect(locationUpdatePage.getBearingInput()).toMatch('5');
        locationUpdatePage.setDirectionInput('direction');
        expect(locationUpdatePage.getDirectionInput()).toMatch('direction');
        locationUpdatePage.setSpeedInput('5');
        expect(locationUpdatePage.getSpeedInput()).toMatch('5');
        locationUpdatePage.setTimestampInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(locationUpdatePage.getTimestampInput()).toContain('2001-01-01T02:30');
        locationUpdatePage.setProviderInput('provider');
        expect(locationUpdatePage.getProviderInput()).toMatch('provider');
        locationUpdatePage.projectSelectLastOption();
        locationUpdatePage.save();
        expect(locationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
