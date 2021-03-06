import { Component, OnInit } from '@angular/core';
import { PrestartDataService } from 'app/custom/prestart-data/prestart-data.service';
import { IPlant } from 'app/shared/model/plant.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    notesForm: FormGroup;

    constructor(private fb: FormBuilder, private prestartDataService: PrestartDataService, private router: Router) {}

    ngOnInit() {
        if (this.prestartDataService.data && this.prestartDataService.data.plantLog && this.prestartDataService.data.plantLog.plant) {
            this.notesForm = this.fb.group({
                notes: [this.prestartDataService.data.plantLog.notes]
            });
        } else {
            console.log('data empty, ', this.prestartDataService.data);
            console.log('navigating back to home ');
            this.router.navigate(['/'], { skipLocationChange: false });
        }
    }

    onSubmit() {
        this.prestartDataService.setNotes(this.notesForm.value.notes);
        this.router.navigate(['/review'], { skipLocationChange: false });
    }
}
