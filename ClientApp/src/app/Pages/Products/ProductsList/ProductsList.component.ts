import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EmbryoService } from '../../../Services/Embryo.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { BaseUrl } from 'src/app/models/baseurl.data';
import { PageEvent, MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SliderType } from "igniteui-angular";
import { Caracteristique } from 'src/app/models/Caracteristique.model';
@Component({
    selector: 'app-ProductsList',
    templateUrl: './ProductsList.component.html',
    styleUrls: ['./ProductsList.component.scss']
})


export class ProductsListComponent implements OnInit {

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    panelOpenState = false;
    Products: any[] = [];
    type: any = "";
    pips: boolean = true;
    tooltips: boolean = true;
    category: any;
    pageTitle: string;
    subPageTitle: string;
    public Count: number;
    public pageNumber: number = 0;
    brandsOfProducts: any = [];
    // MatPaginator Inputs
    length = 100;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    pageEvent: PageEvent;
    cardsObs: Observable<any>;
    categoriesdtopsimple: any = [];
    caracDto: any = []
    selectedCaracs: any = []




    subscribers: any = {};
    productsGrid: any;
    selectedBrands: any = [];
    filterValue: string;
    caracs:Caracteristique[]=[]

    constructor(
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        public embryoService: EmbryoService,
        private genericservice: AdminGenericService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {

    
        this.route.params.subscribe((res: any) => {
            this.type = res.type;
            this.caracDto = []
            this.getData()
            this.getCategoriesDtosimple()
            //  this.getReducedCaracteristiques()

        })
    }


    getCategoriesDtosimple() {
        this.genericservice.get(BaseUrl + '/Categories/CategSousCategdto')
            .subscribe((res: any) => {
                this.categoriesdtopsimple = res;
            });
    }

    // getReducedCaracteristiques() {
    //     this.genericservice.get(BaseUrl + '/Caracteristiques/reduced')
    //         .subscribe((res:any) => {
    //             this.caracteristiques = res;

    //             for (let key in this.caracteristiques) {
    //                 let value = this.caracteristiques[key];

    //                 this.caracDto.push({key,value})
    //                 // Use `key` and `value`
    //             }

    //         },
    //         err=>{
    //             console.log(err);

    //         });
    // }

    onselectCategorie(souscategorie) {
        this.router.navigate(['/products', souscategorie]);
        this.caracDto = []
    }


    onselectCaract(caracnom,value) {
    let caracForm = this.formBuilder.group({
        key: [caracnom, [Validators.required]],
        value: [value, [Validators.required]]
   });
    
    this.caracs.push(caracForm.value)
        
        console.log(this.caracs);
    }

    onselectBrand() {
        this.updateData(this.selectedBrands)

        console.log(this.selectedBrands);
    }

    onPage(pageEvent: PageEvent) {
        this.list(this.type, this.selectedBrands, pageEvent.pageIndex, pageEvent.pageSize)
            .subscribe(res => {
                this.productsGrid = res.Items
                this.pageNumber = res.pageIndex;
                this.length = res.Count;

                this.dataSource = new MatTableDataSource<any>(this.productsGrid);
                this.cardsObs = this.dataSource.connect();
            },
                err => {
                    console.log(err);
                })
    }

    list(souscategorie = "", filters = this.selectedBrands, page = 0, pagesize = this.pageSize) {
        return this.genericservice.get(BaseUrl + '/Produits?&page=' + page + '&pageSize=' + pagesize + '&sousCategorie=' + souscategorie + '&filter=' + filters)
    }
    getData(type = this.type, filters = this.selectedBrands) {
        this.list(type, filters).subscribe(res => {
            this.productsGrid = res.Items
            this.pageNumber = res.pageIndex;
            this.length = res.Count;
            this.brandsOfProducts = res.Brands;
            this.dataSource = new MatTableDataSource<any>(this.productsGrid);
            this.cardsObs = this.dataSource.connect();
            this.dataSource.paginator = this.paginator;
            console.log(res)
            this.caracDto=res.Caracs
            console.log(this.caracDto);
            

        },
            err => {
                console.log(err);
            })
    }

    updateData(filters = this.selectedBrands) {
        this.list(this.type, filters, 0, this.pageSize).subscribe(res => {
            this.productsGrid = res.Items
            this.pageNumber = res.pageIndex;
            this.length = res.Count;
            // this.brandsOfProducts=res.Brands;
            this.dataSource = new MatTableDataSource<any>(this.productsGrid);
            this.cardsObs = this.dataSource.connect();
            this.dataSource.paginator = this.paginator;
            console.log(res)

        },
            err => {
                console.log(err);
            })
    }

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }
        return value;
    }


    productPage(id, NScat) {
        this.router.navigate(['/products', NScat, id]);
    }

    public getPageTitle() {
        this.pageTitle = null;
        this.subPageTitle = null;

        switch (this.type || this.category) {
            // case undefined:
            //    this.pageTitle = "Fashion";
            //    this.subPageTitle="Explore your favourite fashion style.";
            //    break;
            case undefined:
                this.pageTitle = 'Products';
                this.subPageTitle = 'Choose the wide range of best products.';
                break;

            case 'gadgets':
                this.pageTitle = 'Gadgets';
                this.subPageTitle = 'Check out our new gadgets.';
                break;

            case 'accessories':
                this.pageTitle = 'Accessories';
                this.subPageTitle = 'Choose the wide range of best accessories.';
                break;

            default:
                this.pageTitle = 'Products';
                this.subPageTitle = null;
                break;
        }
    }

    public addToCart(value) {
        this.embryoService.addToCart(value);
    }

    public addToWishList(value) {
        this.embryoService.addToWishlist(value);
    }

    public transformHits(hits) {
        hits.forEach(hit => {
            hit.stars = [];
            for (let i = 1; i <= 5; i) {
                hit.stars.push(i <= hit.rating);
                i += 1;
            }
        });
        return hits;
    }

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    applyFilter() {
        let value = this.filterValue.trim().toLowerCase()
        console.log(value);

        this.genericservice.get(BaseUrl + '/Produits/search?&page=' + 0 + '&pageSize=' + this.pageSize + '&filter=' + value)
            .subscribe(res => {
                this.productsGrid = res.Items
                this.pageNumber = res.pageIndex;
                this.length = res.Count;
                // this.brandsOfProducts=res.Brands;
                this.dataSource = new MatTableDataSource<any>(this.productsGrid);
                this.cardsObs = this.dataSource.connect();
                this.dataSource.paginator = this.paginator;
                console.log(res)

            },
                err => {
                    console.log(err);

                });


        //  this.dataSource.filter = value;
        //  if (this.dataSource.paginator) {
        //      this.dataSource.paginator.firstPage();
        //  }
    }


}
