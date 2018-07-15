import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { NiggleSnapshotComponentsPage, NiggleSnapshotUpdatePage } from './niggle-snapshot.page-object';

describe('NiggleSnapshot e2e test', () => {
    let navBarPage: NavBarPage;
    let niggleSnapshotUpdatePage: NiggleSnapshotUpdatePage;
    let niggleSnapshotComponentsPage: NiggleSnapshotComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load NiggleSnapshots', () => {
        navBarPage.goToEntity('niggle-snapshot');
        niggleSnapshotComponentsPage = new NiggleSnapshotComponentsPage();
        expect(niggleSnapshotComponentsPage.getTitle()).toMatch(/prestartApp.niggleSnapshot.home.title/);
    });

    it('should load create NiggleSnapshot page', () => {
        niggleSnapshotComponentsPage.clickOnCreateButton();
        niggleSnapshotUpdatePage = new NiggleSnapshotUpdatePage();
        expect(niggleSnapshotUpdatePage.getPageTitle()).toMatch(/prestartApp.niggleSnapshot.home.createOrEditLabel/);
        niggleSnapshotUpdatePage.cancel();
    });

    it('should create and save NiggleSnapshots', () => {
        niggleSnapshotComponentsPage.clickOnCreateButton();
        niggleSnapshotUpdatePage.setDateInput('2000-12-31');
        expect(niggleSnapshotUpdatePage.getDateInput()).toMatch('2000-12-31');
        niggleSnapshotUpdatePage.statusSelectLastOption();
        niggleSnapshotUpdatePage.prioritySelectLastOption();
        niggleSnapshotUpdatePage.setCountInput('5');
        expect(niggleSnapshotUpdatePage.getCountInput()).toMatch('5');
        niggleSnapshotUpdatePage.setAgeOfOldestInput('5');
        expect(niggleSnapshotUpdatePage.getAgeOfOldestInput()).toMatch('5');
        niggleSnapshotUpdatePage.save();
        expect(niggleSnapshotUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
