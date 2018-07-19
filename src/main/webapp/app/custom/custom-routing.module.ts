import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { prestartRoute } from './route/prestart.route';

const routes: Routes = [...prestartRoute];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomRoutingModule {}
