import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { NiggleComponentsPage, NiggleUpdatePage } from './niggle.page-object';

describe('Niggle e2e test', () => {
    let navBarPage: NavBarPage;
    let niggleUpdatePage: NiggleUpdatePage;
    let niggleComponentsPage: NiggleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Niggles', () => {
        navBarPage.goToEntity('niggle');
        niggleComponentsPage = new NiggleComponentsPage();
        expect(niggleComponentsPage.getTitle()).toMatch(/prestartApp.niggle.home.title/);
    });

    it('should load create Niggle page', () => {
        niggleComponentsPage.clickOnCreateButton();
        niggleUpdatePage = new NiggleUpdatePage();
        expect(niggleUpdatePage.getPageTitle()).toMatch(/prestartApp.niggle.home.createOrEditLabel/);
        niggleUpdatePage.cancel();
    });

    it('should create and save Niggles', () => {
        niggleComponentsPage.clickOnCreateButton();
        niggleUpdatePage.setDescriptionInput('description');
        expect(niggleUpdatePage.getDescriptionInput()).toMatch('description');
        niggleUpdatePage.statusSelectLastOption();
        niggleUpdatePage.setNoteInput('note');
        expect(niggleUpdatePage.getNoteInput()).toMatch('note');
        niggleUpdatePage.prioritySelectLastOption();
        niggleUpdatePage.setQuattraReferenceInput('quattraReference');
        expect(niggleUpdatePage.getQuattraReferenceInput()).toMatch('quattraReference');
        niggleUpdatePage.setQuattraCommentsInput('quattraComments');
        expect(niggleUpdatePage.getQuattraCommentsInput()).toMatch('quattraComments');
        niggleUpdatePage.setInvoiceNoInput('invoiceNo');
        expect(niggleUpdatePage.getInvoiceNoInput()).toMatch('invoiceNo');
        niggleUpdatePage.setDateOpenedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(niggleUpdatePage.getDateOpenedInput()).toContain('2001-01-01T02:30');
        niggleUpdatePage.setDateClosedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(niggleUpdatePage.getDateClosedInput()).toContain('2001-01-01T02:30');
        niggleUpdatePage.setDateCompletedInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(niggleUpdatePage.getDateCompletedInput()).toContain('2001-01-01T02:30');
        niggleUpdatePage.setEtaInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(niggleUpdatePage.getEtaInput()).toContain('2001-01-01T02:30');
        niggleUpdatePage.purchaseOrderSelectLastOption();
        niggleUpdatePage.plantSelectLastOption();
        niggleUpdatePage.assignedContractorSelectLastOption();
        niggleUpdatePage.save();
        expect(niggleUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
