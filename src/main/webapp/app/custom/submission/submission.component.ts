import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { PrestartDataService, Data } from '../prestart-data/prestart-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'jhi-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit, AfterViewInit {
    checked = true;
    signed = false;
    submitting = false;
    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    readonly signaturePadOptions: Object = {
        // passed through to szimek/signature_pad constructor
        // minWidth: 5,
        canvasWidth: 278,
        canvasHeight: 198
    };

    constructor(private prestartDataService: PrestartDataService, private router: Router, public snackBar: MatSnackBar) {}

    ngOnInit() {
        // this.signaturePad.resizeCanvas();
        //  this.signaturePad.ngAfterContentInit
    }
    ngAfterViewInit() {
        // this.signaturePad.resizeCanvas();
    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        this.signed = true;
        console.log('size of signature', this.signaturePad.toDataURL().length);
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }

    onSubmit() {
        this.submitting = true;
        const dataurl = this.signaturePad.toDataURL('image/png');
        console.log(dataurl);
        const data = dataurl.substr(dataurl.indexOf('base64,') + 'base64,'.length);
        console.log(data);
        this.prestartDataService.setSignature('image/png', data);
        this.prestartDataService.save().subscribe(
            response => {
                this.submitting = false;
                console.log(response);
                this.prestartDataService.initialize();
                this.router.navigate(['/result']);
            },
            error => {
                this.submitting = false;
                console.log(error);
                this.snackBar.open(error.message, null, {
                    duration: 3000
                });
            }
        );
    }
}
