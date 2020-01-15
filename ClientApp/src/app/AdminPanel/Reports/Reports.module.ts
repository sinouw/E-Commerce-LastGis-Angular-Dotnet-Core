import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './Reports/Reports.component';
import { ReportsRoutes} from './Reports.routing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule,
			MatButtonModule,
			MatCardModule,
			MatTableModule,
			MatMenuModule,
			MatDividerModule,
			MatTabsModule,
			MatChipsModule,
			MatPaginatorModule,
			MatSortModule,
			MatGridListModule,
			MatSidenavModule,
			MatCheckboxModule,
			MatSelectModule,
			MatOptionModule,
			MatFormFieldModule,
			MatInputModule,
			MatListModule} from '@angular/material';
import { WidgetModule } from '../Widget/Widget.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GlobalModule } from 'src/app/Global/Global.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
	declarations: [ReportsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(ReportsRoutes),
		TranslateModule,
		MatIconModule,
		MatTableModule,
		MatDividerModule,
		WidgetModule,
		MatTabsModule,
      MatChipsModule,
	  TranslateModule,
      MatPaginatorModule,
      MatSortModule,
      MatGridListModule,
      GlobalModule,
      FormsModule,
	  ReactiveFormsModule,
	  FlexLayoutModule,
      MatSidenavModule,
      MatIconModule,	      
		MatCheckboxModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatMenuModule,
      MatOptionModule,
      MatFormFieldModule,
      MatInputModule,
      MatDividerModule,
	  MatListModule, 
	  SlickCarouselModule
	]
})
export class ReportsModule { }
