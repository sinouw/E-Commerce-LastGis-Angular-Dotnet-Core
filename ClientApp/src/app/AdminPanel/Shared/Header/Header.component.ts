import { Component, OnInit } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import { EmbryoService } from '../../../Services/Embryo.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

	constructor(private coreService : AdminPanelServiceService,
               public embryoService: EmbryoService) { }

	ngOnInit() {
	}

	/**
     * toggleSidebar method is used a toggle a side nav bar.
     */
   toggleSidebar() {
      this.coreService.sidenavOpen = !this.coreService.sidenavOpen;
   }

   public selectedLanguage(value) {
      this.embryoService.language = value;
   }

}
