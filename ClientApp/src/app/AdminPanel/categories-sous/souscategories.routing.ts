import { Routes } from '@angular/router';
import { SousCategoriesComponent } from "./sous-categories/sous-categories.component";
import { AuthGuard } from 'src/app/guards/auth.guard';
export const SousCategoriesRoutes: Routes = [
	// {
	// 	path      : '',
	// 	redirectTo: 'SousCategories',
	// 	pathMatch: 'full'
	// },
	{
		path: '',
		canActivate: [AuthGuard],
        children: [
			{ 
				path: "", 
				component: SousCategoriesComponent 
			},
			{ 
				path: ':id', 
				component: SousCategoriesComponent 
			},
			{ 
				path: 'cat', 
				component: SousCategoriesComponent 
			},
	]
}
];

