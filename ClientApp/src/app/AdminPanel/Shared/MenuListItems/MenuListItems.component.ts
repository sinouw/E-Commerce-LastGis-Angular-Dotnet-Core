import { Component, OnInit } from '@angular/core';
import { AdminMenuItems } from '../../Core/Menu/MenuItems/MenuItems';
import { Router,ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-menu-list-items',
	templateUrl: './MenuListItems.component.html',
	styleUrls: ['./MenuListItems.component.scss']
})

export class MenuListItemsComponent implements OnInit {

	menu :any[]=[]


	constructor(public menuItems: AdminMenuItems,
				private router :Router,
                private activatedRoute: ActivatedRoute,
                public translate : TranslateService ) { }

	ngOnInit() {
		this.menu=this.menuItems.getAll()
	}

}
