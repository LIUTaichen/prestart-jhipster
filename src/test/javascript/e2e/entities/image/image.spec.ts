import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ImageComponentsPage, ImageUpdatePage } from './image.page-object';
import * as path from 'path';

describe('Image e2e test', () => {
    let navBarPage: NavBarPage;
    let imageUpdatePage: ImageUpdatePage;
    let imageComponentsPage: ImageComponentsPage;
    const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Images', () => {
        navBarPage.goToEntity('image');
        imageComponentsPage = new ImageComponentsPage();
        expect(imageComponentsPage.getTitle()).toMatch(/prestartApp.image.home.title/);
    });

    it('should load create Image page', () => {
        imageComponentsPage.clickOnCreateButton();
        imageUpdatePage = new ImageUpdatePage();
        expect(imageUpdatePage.getPageTitle()).toMatch(/prestartApp.image.home.createOrEditLabel/);
        imageUpdatePage.cancel();
    });

    it('should create and save Images', () => {
        imageComponentsPage.clickOnCreateButton();
        imageUpdatePage.setDescriptionInput('description');
        expect(imageUpdatePage.getDescriptionInput()).toMatch('description');
        imageUpdatePage.setImageInput(absolutePath);
        imageUpdatePage.plantAuditSelectLastOption();
        imageUpdatePage.save();
        expect(imageUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
