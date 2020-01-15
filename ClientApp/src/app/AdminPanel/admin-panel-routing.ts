import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes} from '@angular/router';
import {MainAdminPanelComponent} from './Main/Main.component';

export const AdminPanelRoutes: Routes = [
    {
        path: 'admin-panel',
        redirectTo: 'admin-panel/reports',
        pathMatch: 'full',
    },
    {
        path: 'admin-panel',
        component: MainAdminPanelComponent,
        children: [
            {
                path: 'reports', loadChildren: () =>
                    import('./Reports/Reports.module').then(m => m.ReportsModule)
            },
            {
                path: 'invoices', loadChildren: () =>
                    import('./Invoices/Invoices.module').then(m => m.InvoicesModule)
            },
            {
                path: 'categories', loadChildren: () =>
                    import('./categories/categories.module').then(m => m.CategoriesModule)
            },
            {
                path: 'souscategories', loadChildren: () =>
                    import('./categories-sous/categories-sous.module').then(m => m.CategoriesSousModule)
            },
            {
                path: '', loadChildren: () =>
                    import('./Products/Products.module').then(m => m.ProductsModule)
            },
            {
                path: 'account', loadChildren: () =>
                    import('./AdminAccount/AdminAccount.module').then(m => m.AdminAccountModule)
            }
        ]
    }
];
