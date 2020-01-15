import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule,
         MatCardModule,
         MatFormFieldModule,
         MatInputModule,
			MatIconModule,
         MatButtonModule,
         MatPaginatorModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InvoicesComponent } from './Invoices/Invoices.component';
import { InvoicesRoutes} from './Invoices.routing';

@NgModule({
	declarations: [InvoicesComponent],
	imports: [
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatTableModule,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      FlexLayoutModule,
      MatPaginatorModule,
		RouterModule.forChild(InvoicesRoutes)
	]
})
export class InvoicesModule { }
