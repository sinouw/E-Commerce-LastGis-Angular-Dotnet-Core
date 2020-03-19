import {Component, OnInit} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-see-list-dialog',
    templateUrl: './SeeListDialog.component.html',
    styleUrls: ['./SeeListDialog.component.scss']
})
export class SeeListDialogComponent implements OnInit {

    public config: PerfectScrollbarConfigInterface = {};

    todayDate = new Date();

    constructor(public dialogRef: MatDialogRef<SeeListDialogComponent>) {
    }

    ngOnInit() {
    }

}
