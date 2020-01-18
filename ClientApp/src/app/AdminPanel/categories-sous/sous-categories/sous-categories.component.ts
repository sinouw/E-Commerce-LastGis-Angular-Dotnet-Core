import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminPanelServiceService} from '../../Service/AdminPanelService.service';
import {MatTableDataSource, MatPaginator} from '@angular/material';
import {BaseUrl} from '../../../models/baseurl.data';
import {AdminGenericService} from '../../Service/AdminGeneric.service';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-sous-categories',
    templateUrl: './sous-categories.component.html',
    styleUrls: ['./sous-categories.component.css']
})
export class SousCategoriesComponent implements OnInit {

    popUpDeleteUserResponse: any;
    invoiceList: any [] = [];
    souscategories: any = [];
    idCat;

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    popUpNewResResponse;
    dataSource = new MatTableDataSource<any>(this.souscategories);

    displayedColumns: string[] = ['NsousCategorie', 'CreationDate', 'action'];

    // displayedColumns : string[] = ['Ncategorie','action'];
    constructor(
        public service: AdminPanelServiceService,
        private genericservice: AdminGenericService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.idCat = this.route.snapshot.paramMap.get('id');
        console.log(this.idCat);

        this.getDataInfo();
    }

    getDataInfo() {
        if (this.idCat != null) {
            this.getSousCategoriesById();
        } else {
            this.getSousCategories();
        }
        this.service.getInvoiceContent().valueChanges().subscribe(res => this.getInvoiceData(res));
    }

    //getInvoiceData method is used to get the invoice list data.
    getInvoiceData(response) {
        this.invoiceList = response;
        setTimeout(() => {
            this.dataSource = new MatTableDataSource<any>(this.souscategories);
            this.dataSource.paginator = this.paginator;
        }, 2000);
    }

    getSousCategoriesById() {
        this.genericservice.get(BaseUrl + `/categories/${this.idCat}`)
            .subscribe(res => {
                this.souscategories = res.SousCategories;
                console.log(res);
            }, err => {
                console.log(err);

            });
    }

    getSousCategories() {
        this.genericservice.get(BaseUrl + `/souscategories/forAdmin`)
            .subscribe(res => {
                this.souscategories = res;
                console.log(res);
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
        this.genericservice.delete(BaseUrl + '/souscategories/' + id)
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

// applyFilter function can be set which takes a data object and filter string and returns true if the data object is considered a match.
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /**
     * add new souscategorie Dialog method is used to open a add new sous categorie dialog.
     */
    addNewSousCategorieDialog() {
        this.service.addNewSousCategorieDialog().subscribe(res => {
                this.popUpNewResResponse = res;
            },
            err => console.log(err),
            () => this.getAddResPopupResponse(this.popUpNewResResponse));

    }

    getAddResPopupResponse(response: any) {
        if (response) {

            let addSousCategorie = {
                IdCat: response.IdCat,
                IdScat: response.IdScat,
                NsousCategorie: response.NsousCategorie,
                CreationDate: response.CreationDate,
                UserId: response.UserId
            };
            this.souscategories.push(addSousCategorie);
            this.dataSource = new MatTableDataSource<any>(this.souscategories);
        }
    }

    /**
     * Edit Souscategorie Dialog method is used to open a Edit Souscategorie dialog.
     */
    EditSousCategorieDialog(element, i) {
        this.service.EditSousCategorieDialog(element).subscribe(res => {
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

            let addSousCategorie = {
                IdCat: response.IdCat,
                IdScat: response.IdScat,
                NsousCategorie: response.NsousCategorie,
                CreationDate: response.CreationDate,
                UserId: response.UserId
            };
            this.souscategories[i] = addSousCategorie;
            this.dataSource = new MatTableDataSource<any>(this.souscategories);
            // }
        }

    }

}
