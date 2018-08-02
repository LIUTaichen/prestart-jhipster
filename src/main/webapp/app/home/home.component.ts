import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { AdalService } from 'adal-angular4';
import { Principal, Account } from 'app/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    readonly config: adal.Config = {
        tenant: 'dempseywood.co.nz',
        clientId: '719e1fc1-7271-483e-ad43-3e376e7083c5'
    };

    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private adalService: AdalService,
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService
    ) {
        this.adalService.init(this.config);
    }

    ngOnInit() {
        this.registerAuthenticationSuccess();
        if (this.adalService.userInfo.authenticated) {
            console.log('authenticated');
            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });
        } else {
            this.adalService.login();
        }
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.adalService.login();
    }

    logout() {
        this.adalService.clearCache();
        this.adalService.logOut();
    }
}
