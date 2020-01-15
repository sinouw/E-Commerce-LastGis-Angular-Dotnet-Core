import { Component, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   constructor(translate: TranslateService, private route: Router) {
console.log(route.config);
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');
      translate.use('fr');
      // const browserLang: string = translate.getBrowserLang();
      // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
   }
}
