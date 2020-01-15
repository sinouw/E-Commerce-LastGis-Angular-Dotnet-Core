import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../Service/account.service';
import { EmbryoService } from 'src/app/Services/Embryo.service';

@Component({
	selector: 'embryo-header-user-profile',
	templateUrl: './HeaderUserProfileDropdown.component.html',
	styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})

export class HeaderUserProfileDropdownComponent implements OnInit {

	constructor(public router : Router , private accountService : AccountService,public embryoService: EmbryoService) { }

	ngOnInit() {
		
		
	}

	//log out method 
	logOut(){
		localStorage.removeItem('token');
		document.getElementById('html').classList.remove("admin-panel");
		this.embryoService.connected=false;
		this.router.navigate(['/session/signin']);
	}
}
