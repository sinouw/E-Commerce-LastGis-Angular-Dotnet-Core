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
    pageSize = 25;
    pageSizeOptions: number[] = [ 25 , 50, 100];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    pageEvent: PageEvent;
    cardsObs: Observable<any>;
    categoriesdtopsimple: any = [];
    caracDto: any = []
    selectedCaracs: any = []



    filterPrix:any="desc"
    stringfilterPrix=0
    subscribers: any = {};
    productsGrid: any = [];
    selectedBrands: any = [];
    filterValue: string;
    caracs: Caracteristique[] = []

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


    onFilterPrixChange(){
        console.clear()
        console.log(this.stringfilterPrix);
        if (this.stringfilterPrix==0) {
            this.filterPrix="desc"
        } else {
            this.filterPrix="asc"
        }
        console.log(this.filterPrix);
        
         this.updateData(this.selectedBrands)
    }

    getCategoriesDtosimple() {
        this.genericservice.get(BaseUrl + '/Categories/CategSousCategdto')
            .subscribe((res: any) => {
                this.categoriesdtopsimple = res;
            });
    }

    onselectCategorie(souscategorie) {
        this.router.navigate(['/products', souscategorie]);
        this.caracDto = []
    }


    onselectCaract(caracnom, value) {
        let x
        let caracForm = this.formBuilder.group({
            key: [caracnom, [Validators.required]],
            value: [value, [Validators.required]]
        });

        if (this.caracs.length == 0 || this.caracs == null) {
            this.caracs.push(caracForm.value)
            console.log(this.caracs);

        }
        else {
            //push without duplicating
            if (!this.caracs.some(x => x.value == value && x.key == caracnom)) {
                this.caracs.push(caracForm.value)
                console.log(this.caracs);

            } else {
                //delete in case of repush 
                for (let index = 0; index < this.caracs.length; index++) {
                    const c = this.caracs[index];
                    if (c.key == caracnom) {
                        {
                            if (c.value == value) {
                                this.caracs.splice(index, 1)
                            }
                        }
                    }
                }

            }
        }
        console.log(this.caracs);
    }


    filterWithspecs() {
        console.log(this.caracs);
        if (this.caracs.length == 0) {
            this.updateData(this.selectedBrands)
        }
        else {
            this.genericservice.post(BaseUrl + '/Produits/search/specs?&page=' + 0 + '&pageSize=' + this.pageSize + '&sousCategorie=' + this.type+'&filterPrix='+this.filterPrix, this.caracs)
                .subscribe(res => {

                     let selectedProds:any=[]

                                 
                    if(this.selectedBrands.length==0){
                        
                        this.productsGrid = res.Items
                        this.pageNumber = res.pageIndex;
                        this.length = res.Count;
                        this.dataSource = new MatTableDataSource<any>(this.productsGrid);
                        this.cardsObs = this.dataSource.connect();
                        this.dataSource.paginator = this.paginator;
                        console.log(res)
                    }
                    else{
                        this.selectedBrands.forEach(brand => {
                            
                            res.Items.forEach(prod => {
                                if(prod.Marque == brand)
                                selectedProds.push(prod)
                            });
                            
                        });  

                        this.productsGrid = selectedProds
                        this.pageNumber = res.pageIndex;
                        this.length = selectedProds.length;
                        this.dataSource = new MatTableDataSource<any>(this.productsGrid);
                        this.cardsObs = this.dataSource.connect();
                        this.dataSource.paginator = this.paginator;
                        console.log(res)
                    }

                },
                    err => {
                        console.log(err)
                    })
                }



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
        return this.genericservice.get(BaseUrl + '/Produits?&page=' + page + '&pageSize=' + pagesize + '&sousCategorie=' + souscategorie + '&filter=' + filters+'&filterPrix='+this.filterPrix)
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
            this.caracDto = res.Caracs
            console.log(this.caracDto);


        },
            err => {
                console.log(err);
            })
    }

    updateData(filters = this.selectedBrands) {
        this.list(this.type, filters, 0, this.pageSize).subscribe(res => {
       if(this.caracs.length==0){
               this.productsGrid = res.Items
               this.pageNumber = res.pageIndex;
               this.length = res.Count;
                // this.brandsOfProducts=res.Brands;
                this.caracDto = res.Caracs
               this.dataSource = new MatTableDataSource<any>(this.productsGrid);
               this.cardsObs = this.dataSource.connect();
               this.dataSource.paginator = this.paginator;
               console.log(res)
       }else{
           let selectedProds:any=[]
           res.Items.forEach(prod => {
               prod.Caracteristiques.forEach(carac=>{

                this.caracs.forEach(filtercaracs => {
                    if(filtercaracs.key==carac.Key && filtercaracs.value==carac.Value){
                            selectedProds.push(prod);
                    }
                });

               })
               
           });

           this.productsGrid = selectedProds;
           this.pageNumber = res.pageIndex;
           this.length = selectedProds.length;
           // this.brandsOfProducts=res.Brands;
           this.dataSource = new MatTableDataSource<any>(this.productsGrid);
           this.cardsObs = this.dataSource.connect();
           this.dataSource.paginator = this.paginator;
           console.log(res)


       }

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
        let value = this.filterValue.trim().toLowerCase().toString()
        console.log(value);

        this.genericservice.get(BaseUrl + '/Produits/search?&page=' + 0 + '&pageSize=' + this.pageSize + '&filter=' + value+'&filterPrix='+this.filterPrix)
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
