import { Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const CategoriesRoutes: Routes = [
	{
		path      : '',
		canActivate: [AuthGuard],
		component : CategoriesListComponent
	}
];
