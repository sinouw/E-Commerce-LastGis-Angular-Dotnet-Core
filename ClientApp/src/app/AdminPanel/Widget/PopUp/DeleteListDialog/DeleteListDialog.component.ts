import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {of} from 'rxjs/observable/of';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-delete-list-dialog',
    templateUrl: './DeleteListDialog.component.html',
    styleUrls: ['./DeleteListDialog.component.scss']
})

export class DeleteListDialogComponent implements OnInit {

    data: string;

    constructor(public dialogRef: MatDialogRef<DeleteListDialogComponent>) {
    }

    ngOnInit() {
    }

    yes() {
        this.dialogRef.close('yes');
    }
}
