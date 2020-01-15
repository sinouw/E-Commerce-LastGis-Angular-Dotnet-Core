import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { RouterModule } from '@angular/router';
import { CategoriesRoutes } from './categories.routing';
import { MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatPaginatorModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [CategoriesListComponent],
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
		RouterModule.forChild(CategoriesRoutes)
  ]
})
export class CategoriesModule { }
