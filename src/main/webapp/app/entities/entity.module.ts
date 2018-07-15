import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrestartPlantModule } from './plant/plant.module';
import { PrestartLocationModule } from './location/location.module';
import { PrestartOffHireRequestModule } from './off-hire-request/off-hire-request.module';
import { PrestartCategoryModule } from './category/category.module';
import { PrestartCompanyModule } from './company/company.module';
import { PrestartMaintenanceContractorModule } from './maintenance-contractor/maintenance-contractor.module';
import { PrestartProjectModule } from './project/project.module';
import { PrestartCompetencyModule } from './competency/competency.module';
import { PrestartPeopleModule } from './people/people.module';
import { PrestartNiggleModule } from './niggle/niggle.module';
import { PrestartPlantLogModule } from './plant-log/plant-log.module';
import { PrestartPurchaseOrderModule } from './purchase-order/purchase-order.module';
import { PrestartNiggleSnapshotModule } from './niggle-snapshot/niggle-snapshot.module';
import { PrestartEmailSubscriptionModule } from './email-subscription/email-subscription.module';
import { PrestartPrestartCheckModule } from './prestart-check/prestart-check.module';
import { PrestartPrestartCheckResponseModule } from './prestart-check-response/prestart-check-response.module';
import { PrestartPrestartCheckConfigModule } from './prestart-check-config/prestart-check-config.module';
import { PrestartPrestartQuestionModule } from './prestart-question/prestart-question.module';
import { PrestartPrestartQuestionOptionModule } from './prestart-question-option/prestart-question-option.module';
import { PrestartPrestartCheckQuestionListItemModule } from './prestart-check-question-list-item/prestart-check-question-list-item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PrestartPlantModule,
        PrestartLocationModule,
        PrestartOffHireRequestModule,
        PrestartCategoryModule,
        PrestartCompanyModule,
        PrestartMaintenanceContractorModule,
        PrestartProjectModule,
        PrestartCompetencyModule,
        PrestartPeopleModule,
        PrestartNiggleModule,
        PrestartPlantLogModule,
        PrestartPurchaseOrderModule,
        PrestartNiggleSnapshotModule,
        PrestartEmailSubscriptionModule,
        PrestartPrestartCheckModule,
        PrestartPrestartCheckResponseModule,
        PrestartPrestartCheckConfigModule,
        PrestartPrestartQuestionModule,
        PrestartPrestartQuestionOptionModule,
        PrestartPrestartCheckQuestionListItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestartEntityModule {}
