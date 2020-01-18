import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminPanelServiceService} from '../../Service/AdminPanelService.service';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {BaseUrl} from '../../../models/baseurl.data';
import {AdminGenericService} from '../../Service/AdminGeneric.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

    popUpDeleteUserResponse: any;
    invoiceList: any [] = [];
    categories: any;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    popUpNewResResponse;
    dataSource = new MatTableDataSource<any>(this.invoiceList);

    displayedColumns: string[] = ['Ncategorie', 'CreationDate', 'action'];

    // displayedColumns : string[] = ['Ncategorie','action'];
    constructor(
        public service: AdminPanelServiceService,
        private genericservice: AdminGenericService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.getDataInfo();
    }

    getDataInfo() {
        this.getCategories();
        this.service.getInvoiceContent().valueChanges().subscribe(res => this.getInvoiceData(res));
    }

    // getInvoiceData method is used to get the invoice list data.
    getInvoiceData(response) {
        this.invoiceList = response;
        setTimeout(() => {
            this.dataSource = new MatTableDataSource<any>(this.categories);
            this.dataSource.paginator = this.paginator;
        }, 2000);

    }

    getCategories() {
        this.genericservice.get(BaseUrl + '/Categories/foradmins')
            .subscribe(res => {
                console.log(res);
                this.categories = res;
            }, err => {
                console.log(err);

            });
    }

    /**
     *onDelete method is used to open a delete dialog.
     */
    onDelete(idcat, i) {
        this.service.deleteDialog('Are you sure you want to delete this invoice permanently?').subscribe(res => {
                this.popUpDeleteUserResponse = res;
            },
            err => console.log(err),
            () => this.getDeleteResponse(this.popUpDeleteUserResponse, i, idcat));
    }

    deleteCateg(id) {
        this.genericservice.delete(BaseUrl + '/categories/' + id)
            .subscribe(res => {
                console.log(res);

            }, err => {
                console.log(err);
            });
    }

    /**
     * getDeleteResponse method is used to delete a invoice from the invoice list.
     */
    getDeleteResponse(response: string, i, idcat) {
        if (response == 'yes') {
            this.deleteCateg(idcat);
            this.dataSource.data.splice(i, 1);
            this.dataSource = new MatTableDataSource(this.dataSource.data);
            this.dataSource.paginator = this.paginator;
        }
    }

    /**
     * onSeeDialog method is used to open a see dialog.
     */
    onSeeDialog() {
        this.service.seeList();
    }

    //applyFilter function can be set which takes a data object and filter string and returns true if the data object is considered a match.
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /**
     * add new categorie Dialog method is used to open a add new categorie dialog.
     */
    addNewCategorieDialog() {
        this.service.addNewCategorieDialog().subscribe(res => {
                this.popUpNewResResponse = res;
            },
            err => console.log(err),
            () => this.getAddResPopupResponse(this.popUpNewResResponse));

    }

    getAddResPopupResponse(response: any) {
        if (response) {

            let addCategorie = {
                IdCat: response.IdCat,
                Ncategorie: response.Ncategorie,
                CreationDate: response.CreationDate,
                UserId: response.UserId
            };
            this.categories.push(addCategorie);
            this.dataSource = new MatTableDataSource<any>(this.categories);
        }
    }

    /**
     * Edit categorie Dialog method is used to open a Edit categorie dialog.
     */
    EditCategorieDialog(element, i) {
        this.service.EditCategorieDialog(element).subscribe(res => {
                this.popUpNewResResponse = res;
            },
            err => console.log(err),
            () => this.getEditResPopupResponse(this.popUpNewResResponse, i));

    }

    getEditResPopupResponse(response: any, i) {
        if (response) {
            // this.invoiceList = []
            // this.getDataInfo()
            console.log(response);

            let addCategorie = {
                IdCat: response.IdCat,
                Ncategorie: response.Ncategorie,
                CreationDate: response.CreationDate,
                UserId: response.UserId
            };
            this.categories[i] = addCategorie;
            //   this.categories.push(addCategorie);
            this.dataSource = new MatTableDataSource<any>(this.categories);
            // }
        }
    }

    listSousCategories(id) {
        // this.router.navigate(['/admin-panel/souscategories']);
        this.router.navigate(['/admin-panel/souscategories/', id]);
    }

}
