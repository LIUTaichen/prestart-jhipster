import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CompetencyComponentsPage, CompetencyUpdatePage } from './competency.page-object';

describe('Competency e2e test', () => {
    let navBarPage: NavBarPage;
    let competencyUpdatePage: CompetencyUpdatePage;
    let competencyComponentsPage: CompetencyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Competencies', () => {
        navBarPage.goToEntity('competency');
        competencyComponentsPage = new CompetencyComponentsPage();
        expect(competencyComponentsPage.getTitle()).toMatch(/prestartApp.competency.home.title/);
    });

    it('should load create Competency page', () => {
        competencyComponentsPage.clickOnCreateButton();
        competencyUpdatePage = new CompetencyUpdatePage();
        expect(competencyUpdatePage.getPageTitle()).toMatch(/prestartApp.competency.home.createOrEditLabel/);
        competencyUpdatePage.cancel();
    });

    it('should create and save Competencies', () => {
        competencyComponentsPage.clickOnCreateButton();
        competencyUpdatePage.setCompetencyInput('competency');
        expect(competencyUpdatePage.getCompetencyInput()).toMatch('competency');
        competencyUpdatePage.setGroupingInput('grouping');
        expect(competencyUpdatePage.getGroupingInput()).toMatch('grouping');
        competencyUpdatePage.setSortOrderInput('5');
        expect(competencyUpdatePage.getSortOrderInput()).toMatch('5');
        competencyUpdatePage.save();
        expect(competencyUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
