import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmbryoService } from 'src/app/Services/Embryo.service';

@Component({
  selector: 'embryo-HeaderUserProfileDropdown',
  templateUrl: './HeaderUserProfileDropdown.component.html',
  styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {

   constructor(public router : Router,public embryoService: EmbryoService) { }

   ngOnInit() {
   }
   logOut(){
		localStorage.removeItem('token');
    document.getElementById('html').classList.remove("admin-panel");
    this.embryoService.connected=false;
		this.router.navigate(['/session/signin']);
   }
}
