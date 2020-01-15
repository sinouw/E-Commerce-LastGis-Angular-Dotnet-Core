import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient , HTTP_INTERCEPTORS} from '@angular/common/http';
import { MainAdminPanelComponent } from './Main/Main.component';
import { MenuToggleModule } from './Core/Menu/MenuToggle.module';
import { AdminMenuItems } from './Core/Menu/MenuItems/MenuItems';
import { SideBarComponent } from './Shared/SideBar/SideBar.component';
import { MenuListItemsComponent } from './Shared/MenuListItems/MenuListItems.component';
import { AdminHeaderComponent } from './Shared/Header/Header.component';
import { WidgetModule } from './Widget/Widget.module';
import { MatButtonModule, 
         MatCardModule, 
         MatMenuModule, 
         MatToolbarModule, 
         MatIconModule, 
         MatInputModule, 
         MatDatepickerModule, 
         MatNativeDateModule, 
         MatProgressSpinnerModule,
         MatTableModule, 
         MatExpansionModule, 
         MatSelectModule,
         MatSnackBarModule, 
         MatTooltipModule, 
         MatChipsModule, 
         MatListModule, 
         MatSidenavModule, 
         MatTabsModule, 
         MatProgressBarModule,
         MatCheckboxModule,
         MatSliderModule,
         MatRadioModule,
         MatDialogModule,
         MatGridListModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastaModule} from 'ngx-toasta';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdminPanelRoutes } from './admin-panel-routing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GlobalModule } from '../Global/Global.module';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import { JwtInterceptor } from '../helpers/jwt.interceptor';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

/********** Custom option for ngx-translate ******/
export function createTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [	
		MainAdminPanelComponent,
		SideBarComponent,
		MenuListItemsComponent,
		AdminHeaderComponent,
	],
	imports: [
		CommonModule,
		MenuToggleModule,
		WidgetModule,
		MatButtonModule, 
		MatCardModule, 
      MatMenuModule, 
      FlexLayoutModule,
		MatToolbarModule, 
		MatIconModule, 
		MatInputModule, 
		MatDatepickerModule, 
		MatNativeDateModule, 
		MatProgressSpinnerModule,
		MatTableModule, 
		MatExpansionModule, 
		MatSelectModule,
		MatSnackBarModule, 
		MatTooltipModule, 
		MatChipsModule, 
		MatListModule, 
		MatSidenavModule, 
		MatTabsModule, 
		MatProgressBarModule,
		MatCheckboxModule,
		MatSliderModule,
		MatRadioModule,
		MatDialogModule,
		MatGridListModule,
		PerfectScrollbarModule,
		RouterModule.forChild(AdminPanelRoutes),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient]
			}
		}),
		HttpClientModule,
		GlobalModule,
		ToastaModule.forRoot()
	],
	providers : [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		AdminMenuItems
	],
	exports : [
		RouterModule,
		ToastaModule
	]

})

export class AdminPanelModule { }
