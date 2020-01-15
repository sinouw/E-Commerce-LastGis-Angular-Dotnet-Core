import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf, interval ,  Subscription } from 'rxjs';
import { map, take, delay, withLatestFrom, finalize, tap } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { EmbryoService } from '../Services/Embryo.service';
import { MenuItems } from '../Core/menu/menu-items/menu-items';
import { Directionality } from '@angular/cdk/bidi';
import { MediaChange } from '@angular/flex-layout';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from "@angular/platform-browser";
import { AdminGenericService } from '../AdminPanel/Service/AdminGeneric.service';
import { BaseUrl } from '../models/baseurl.data';

export interface Menu {
   state: string;
   name?: string;
   type?: string;
   icon?: string;
   children?: Menu[];
 }


@Component({
  selector: 'app-main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.scss']
})
export class MainComponent implements OnInit {
   menu : Menu[]=[];
   MenuChilren : Menu[]=[];
   souscategMenu :Menu[]=[]
   timer = 0;
   isRtl: any;
   private _dirChangeSubscription = Subscription.EMPTY;
   currentUrl : any; 

   constructor(private loader : LoadingBarService,
               public embryoService : EmbryoService, 
               public menuItems: MenuItems,
               dir: Directionality,
               public translate: TranslateService,
               private router: Router,
               meta: Meta, title: Title,
               private activatedRoute: ActivatedRoute,
               private genericservice: AdminGenericService) { 


                  this.getCategories().subscribe((res:any) => {
                     // debugger
                     
                     
                     // debugger
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
                     // this.MenuChilren=this.categories
                     
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







      title.setTitle('Embryo - Angular Material Design eCommerce Template');

      meta.addTags([
         { name: 'author',   content: 'The IRON Network'},
         { name: 'keywords', content: ' angular, angular 2, angular 6, angular 7, angular material, clean, creative, ecommerce, frontend, online store, shop, shopping, store, typescript, ui framework '},
         { name: 'description', content: 'Embryo is an E-Commerce angular 7 based template with material design. It also comes with Angular cli. Now you have all the power to maintain your ecommerce site. Responsive design gives your user to use in any modern devices. Clean Code gives you the power to customize the code as per as your requirments. Embryo has all the basics functionality which is required in ecommerce site. Rtl design makes the multi-language support with more easy way.' }
      ]);

      if(this.embryoService.isDirectionRtl) {
         this.isRtl = 'rtl';
      } else {
         this.isRtl = 'ltr';
      }

      this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.currentUrl = event.url;
          }
        });
   }

   ngOnInit() {






      this.startTimer(); 
      document.getElementById('html').classList.remove("admin-panel");
      document.getElementById('html').classList.add("user-end");
   }

   getCategories(){
      return this.genericservice.get(BaseUrl + '/categories/simpleCategdto')
     };

   public startTimer() {
      this.timer = 0;
      interval(1000).pipe(
      take(3),
      tap(value => { this.timer = value + 1; }),
       finalize(() => this.loader.complete()),
      ).subscribe();

      // We're sure that subscription has been made, we can start loading bar service
      this.loader.start();
   }

   public hideSideNav() {
      this.embryoService.sidenavOpen = false;
   }

   public changeDirection() {
      if(this.isRtl == "rtl") {
         this.isRtl = "ltr";
         this.embryoService.isDirectionRtl = false;
      } else {
         this.isRtl = "rtl"
         this.embryoService.isDirectionRtl = true;
      }

      this.embryoService.featuredProductsSelectedTab = 0;
      this.embryoService.newArrivalSelectedTab = 0;
   }

   /**
    * On window scroll add class header-fixed.
    */
   @HostListener('window:scroll', ['$event'])
   onScrollEvent($event){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollTop >= 200) {
           document.querySelector('app-main').classList.add("header-fixed");
       } else {
            document.querySelector('app-main').classList.remove("header-fixed");
       }
   }   

   /**
     *As router outlet will emit an activate event any time a new component is being instantiated.
     */
   onActivate(e) {
      window.scroll(0,0);
   }
}
