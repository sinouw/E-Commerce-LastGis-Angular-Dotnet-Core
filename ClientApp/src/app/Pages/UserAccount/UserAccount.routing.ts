import { Routes } from '@angular/router';

import { AccountComponent } from './Account/Account.component';
import { ProfileComponent } from './Profile/Profile.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { CardsComponent } from './Cards/Cards.component';
import { AddressComponent } from './Address/Address.component';
import { OrderHistoryComponent } from './OrderHistory/OrderHistory.component';
import { GridProductComponent } from './GridProduct/GridProduct.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const UserAccountRoutes : Routes = [
   {
      path : '',
      component : AccountComponent,
      canActivate: [AuthGuard],
      children: [ 
         {
            path: 'profile',
            component: ProfileComponent
         },
         { 
            path: 'cards', 
            component: CardsComponent 
         },
         { 
            path: 'address', 
            component: AddressComponent 
         },
         { 
            path: 'order-history', 
            component: OrderHistoryComponent 
         },
         {
            path: 'profile/edit',
            component: EditProfileComponent
         },
         {
            path: 'grid-product',
            component: GridProductComponent
         }
      ]
   }
]