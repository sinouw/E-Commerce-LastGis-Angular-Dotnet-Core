import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes} from '@angular/router';

import { MainComponent } from './Main/Main.component';
import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
import { HomeTwoComponent } from './Pages/Home/HomeTwo/HomeTwo.component';
import { HomeThreeComponent } from './Pages/Home/HomeThree/HomeThree.component';
import { CartComponent } from './Pages/Cart/Cart.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import { UnauthorizedComponent } from './Pages/unauthorized/unauthorized.component';

export const AppRoutes : Routes = [
   {
      path : '',
      redirectTo: 'home',
      pathMatch: 'full',
   },
   {
      path : '',
      component : MainComponent,
      children: [ 
         {
            path : 'home',
            component : HomeoneComponent
         },
         {
            path : 'home-two',
            component : HomeTwoComponent
         },
         {
            path : 'home-three',
            component : HomeThreeComponent
         },
         {
            path: 'products',loadChildren: ()=>
            import('./Pages/Products/Products.module').then (m => m.ProductsModule)
         },
         {
            path: 'cart',
            component: CartComponent
         },
         {
          path: 'not-found',
          component: NotFoundComponent
         },
         {
            path: 'unauthorized',
            component: UnauthorizedComponent
         },
         {
            path: 'session',loadChildren: ()=>
            import('./Pages/Session/Session.module').then (m => m.SessionModule)
         },
         {
            path: 'checkout',loadChildren: ()=>
            import('./Pages/Checkout/Checkout.module').then (m => m.CheckoutModule)
         },
         {
            path: '',loadChildren: ()=>
            import('./Pages/About/About.module').then( m=> m.AboutModule)
         },
         {
            path: 'blogs',loadChildren: ()=>
            import('./Pages/Blogs/Blogs.module').then (m => m.BlogsModule)
         },
         {
            path: 'account',loadChildren: ()=>
            import('./Pages/UserAccount/UserAccount.module').then (m => m.UserAccountModule)
         }
      ]
   },
   // {
   //    path: '**',
   //    redirectTo: 'not-found'
   // }
]
