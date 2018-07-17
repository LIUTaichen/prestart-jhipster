import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { selectPlantRoute } from './select-plant/select-plant.route';
import { questionsRoute } from './questions/questions.route';
import { plantConfirmationRoute } from './plant-confirmation/plant-confirmaton.route';

const routes: Routes = [...selectPlantRoute, ...plantConfirmationRoute, ...questionsRoute];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomRoutingModule {}
