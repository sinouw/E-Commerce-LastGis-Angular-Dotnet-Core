import { Routes } from '@angular/router';
import { InvoicesComponent } from './Invoices/Invoices.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const InvoicesRoutes: Routes = [
	{
		path      : '',
		canActivate: [AuthGuard],
		component : InvoicesComponent
	}
];
