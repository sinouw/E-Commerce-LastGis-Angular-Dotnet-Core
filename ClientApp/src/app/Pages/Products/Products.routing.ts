import { Routes } from '@angular/router';

import { ProductsListComponent } from './ProductsList/ProductsList.component';
import { DetailPageComponent } from './DetailPage/DetailPage.component';

export const ProductsRoutes : Routes = [
	{ 
		path: '', 
		component: ProductsListComponent 
	},
	{
		path: ':type/:id',
		component: DetailPageComponent
	},
	// {
	// 	path: ':id',
	// 	component: DetailPageComponent
	// },
   { 
      path: ':type', 
      component: ProductsListComponent 
   }
]