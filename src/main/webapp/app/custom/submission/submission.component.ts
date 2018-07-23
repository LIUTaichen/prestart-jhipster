import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
    selector: 'jhi-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    private signaturePadOptions: Object = {
        // passed through to szimek/signature_pad constructor
        minWidth: 5,
        canvasWidth: 500,
        canvasHeight: 300
    };

    constructor() {}

    ngOnInit() {}

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        console.log(this.signaturePad.toDataURL());
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }
}
