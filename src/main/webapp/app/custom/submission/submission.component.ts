import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { PrestartDataService, Data } from '../prestart-data/prestart-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit, AfterViewInit {
    checked = true;
    signed = false;
    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    readonly signaturePadOptions: Object = {
        // passed through to szimek/signature_pad constructor
        // minWidth: 5,
        canvasWidth: 278,
        canvasHeight: 278
    };

    constructor(private prestartDataService: PrestartDataService, private router: Router) {}

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
        this.prestartDataService.setData({
            plant: null,
            chosenOptions: null,
            meterReading: null,
            hubboReading: null
        });
        this.router.navigate(['']);
    }
}
