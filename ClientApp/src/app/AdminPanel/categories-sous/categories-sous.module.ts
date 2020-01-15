import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SousCategoriesComponent} from './sous-categories/sous-categories.component';
import {RouterModule} from '@angular/router';
import {SousCategoriesRoutes} from './souscategories.routing';
import {
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [SousCategoriesComponent],
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
        RouterModule.forChild(SousCategoriesRoutes)
    ]
})
export class CategoriesSousModule {
}
