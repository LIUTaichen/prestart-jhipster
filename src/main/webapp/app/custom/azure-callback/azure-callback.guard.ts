import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdalService } from 'adal-angular4';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AzureCallbackGuard implements CanActivate {
    readonly config: adal.Config = {
        tenant: 'dempseywood.co.nz',
        clientId: '719e1fc1-7271-483e-ad43-3e376e7083c5'
    };

    constructor(
        private router: Router,
        private adalService: AdalService,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService
    ) {
        this.adalService.init(this.config);
        console.log('initializing adalService');
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log('before handle call back', this.adalService.userInfo);
        this.adalService.handleWindowCallback();
        console.log('after handle call back', this.adalService.userInfo);
        console.log('storing token', this.adalService.userInfo.token);
        this.$localStorage.store('authenticationToken', this.adalService.userInfo.token);
        if (this.adalService.userInfo) {
            const returnUrl = route.queryParams['returnUrl'];
            if (!returnUrl) {
                this.router.navigate(['']);
            } else {
                this.router.navigate([returnUrl], { queryParams: route.queryParams });
            }
        } else {
            this.adalService.login();
        }
        return false;
    }
}
