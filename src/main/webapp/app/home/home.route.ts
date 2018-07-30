import { Route } from '@angular/router';

import { HomeComponent } from './';
import { AzureCallbackGuard } from '../custom/azure-callback/azure-callback.guard';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};
