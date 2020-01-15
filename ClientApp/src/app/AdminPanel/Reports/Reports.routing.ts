import { Routes } from '@angular/router';
import { ReportsComponent } from './Reports/Reports.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const ReportsRoutes: Routes = [
	{
		path      : '',
		component : ReportsComponent,
        canActivate: [AuthGuard]
	}
];
