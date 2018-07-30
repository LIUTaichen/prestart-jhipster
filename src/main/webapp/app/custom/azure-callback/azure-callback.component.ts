import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdalService } from 'adal-angular4';

@Component({
    selector: 'jhi-azure-callback',
    templateUrl: './azure-callback.component.html',
    styleUrls: ['./azure-callback.component.css']
})
export class AzureCallbackComponent implements OnInit {
    constructor(private router: Router, private adalService: AdalService) {}

    ngOnInit() {
        if (!this.adalService.userInfo) {
            // this.router.navigate(['']);
        } else {
            // this.router.navigate(['']);
        }
    }
}
