import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

import { MenuItems } from '../../../Core/menu/menu-items/menu-items';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { BaseUrl } from 'src/app/models/baseurl.data';
import { HomeMenu } from 'src/app/Models/MenuHome.model';
import { SousCateg } from 'src/app/Models/souscategorie.model';
import { stringify } from 'querystring';

export interface Menu {
  state: string;
  name?: string;
  type?: string;
  icon?: string;
  children?: Menu[];
}

@Component({
  selector: 'embryo-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})



export class MenuComponent implements OnInit {


    menu : Menu[]=[];
    MenuChilren : Menu[]=[];
    souscategMenu :Menu[]=[]
    expanded       : boolean;

   constructor(public menuItems: MenuItems,public router: Router, public translate: TranslateService,
    private genericservice: AdminGenericService) {
      this.getCategories().subscribe((res:any) => {
        console.log(res);
        
          res.forEach(categorie => {
            let scatmenu :any =[]
          categorie.children.forEach(souscateg => {
           const scat ={
              state: "products/"+souscateg.state.toLowerCase(),
              queryState: souscateg.name,
              name: souscateg.name.toUpperCase(),
              type: 'queryParams',
              icon: 'arrow_right_alt',
            }
            
            scatmenu.push(scat)
            
          });
          
          this.MenuChilren.push(
            {
              state: categorie.state,
              name: categorie.name,
              type: 'sub',
              icon: 'arrow_right_alt',
              children: scatmenu
            }
          )
           this.souscategMenu.length=0 
        });
        
 }); 

  
               
          
      
// debugger
      this.menu = [{
        state: 'home',
        name: 'ACCEUIL',
        type: 'link',
        icon: 'home',
        },
        {
          state: 'products',
          name: 'PRODUCTS',
          type: 'link',
          icon: 'party_mode'
      },
   
      {
        state: 'products',
        name: 'CATEGORIES',
        type: 'sub',
        icon: 'party_mode',
        children: this.MenuChilren
      },
      {
        state: 'contact',
        name: 'CONTACT US',
        type: 'link',
        icon: 'perm_contact_calendar'
    },
  ]
   }

   ngOnInit() {

  
   }

   public onItemSelected(item: any) {
      if (item.children && item.children.length) {
         this.expanded = !this.expanded;
      }
      
   }


   public redirectTo(subchildState){
      let souscategorie = subchildState.state.split("/")[1].toLowerCase()
    this.router.navigate(['/products', souscategorie]);
     
   }

   getCategories(){
     return this.genericservice.get(BaseUrl + '/categories/simpleCategdto')
    };

   
}