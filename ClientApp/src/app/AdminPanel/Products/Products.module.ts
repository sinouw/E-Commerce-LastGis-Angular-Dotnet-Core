import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSidenavModule,
		 	MatIconModule,	
		 	MatButtonModule,
		 	MatCardModule,
		 	MatMenuModule,
		 	MatFormFieldModule,
         MatInputModule,
         MatOptionModule,
         MatSelectModule, 
         MatTableModule,
         MatListModule, 
         MatDividerModule,
         MatPaginatorModule,
         MatSortModule,         
			MatCheckboxModule,
         MatGridListModule
		 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { EditProductComponent } from './EditProduct/EditProduct.component';
import { AddProductComponent } from './AddProduct/AddProduct.component';
import { GlobalModule} from '../../Global/Global.module';
import { ProductsComponent } from './Products/Products.component';
import { ProductsRoutes} from './Products.routing';

@NgModule({
   declarations: [ProductsComponent, EditProductComponent, AddProductComponent],
   imports: [
      CommonModule,
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
      MatTableModule,
      MatDividerModule,
      MatListModule, 
      RouterModule.forChild(ProductsRoutes),
      TranslateModule,
      MatPaginatorModule,
      MatSortModule,
      MatGridListModule,
      GlobalModule,
      FormsModule,
      ReactiveFormsModule
   ]
})
export class ProductsModule { }
