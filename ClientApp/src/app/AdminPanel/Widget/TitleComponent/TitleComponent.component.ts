import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'anglo-title-component',
    templateUrl: './TitleComponent.component.html',
    styleUrls: ['./TitleComponent.component.scss']
})
export class TitleComponent implements OnInit {

    @Input() title: any;

    constructor(public translate: TranslateService) {
    }

    ngOnInit() {
    }

}
