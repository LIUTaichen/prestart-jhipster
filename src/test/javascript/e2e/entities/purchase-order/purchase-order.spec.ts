import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PurchaseOrderComponentsPage, PurchaseOrderUpdatePage } from './purchase-order.page-object';

describe('PurchaseOrder e2e test', () => {
    let navBarPage: NavBarPage;
    let purchaseOrderUpdatePage: PurchaseOrderUpdatePage;
    let purchaseOrderComponentsPage: PurchaseOrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PurchaseOrders', () => {
        navBarPage.goToEntity('purchase-order');
        purchaseOrderComponentsPage = new PurchaseOrderComponentsPage();
        expect(purchaseOrderComponentsPage.getTitle()).toMatch(/prestartApp.purchaseOrder.home.title/);
    });

    it('should load create PurchaseOrder page', () => {
        purchaseOrderComponentsPage.clickOnCreateButton();
        purchaseOrderUpdatePage = new PurchaseOrderUpdatePage();
        expect(purchaseOrderUpdatePage.getPageTitle()).toMatch(/prestartApp.purchaseOrder.home.createOrEditLabel/);
        purchaseOrderUpdatePage.cancel();
    });

    it('should create and save PurchaseOrders', () => {
        purchaseOrderComponentsPage.clickOnCreateButton();
        purchaseOrderUpdatePage.setOrderNumberInput('orderNumber');
        expect(purchaseOrderUpdatePage.getOrderNumberInput()).toMatch('orderNumber');
        purchaseOrderUpdatePage.save();
        expect(purchaseOrderUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
