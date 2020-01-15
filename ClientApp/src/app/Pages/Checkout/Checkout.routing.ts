import { Routes } from '@angular/router';

import { SigninComponent } from './Signin/Signin.component';
import { PaymentComponent } from './Payment/Payment.component';
import { FinalReceiptComponent } from './FinalReceipt/FinalReceipt.component';

export const CheckoutRoutes : Routes = [
   {
      path : "",
      component: SigninComponent 
   },
   { 
      path: 'signin', 
      component: SigninComponent 
   },
	{ 
		path: 'payment', 
		component: PaymentComponent 
	},
   {
      path: 'final-receipt',
      component: FinalReceiptComponent
   }
]