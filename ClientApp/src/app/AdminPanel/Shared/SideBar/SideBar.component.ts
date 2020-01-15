import {Component, OnInit} from '@angular/core';
import {PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
    selector: 'app-side-bar',
    templateUrl: './SideBar.component.html',
    styleUrls: ['./SideBar.component.scss']
})

export class SideBarComponent implements OnInit {

    public config: PerfectScrollbarConfigInterface = {};

    constructor() {
    }

    ngOnInit() {
    }

}
