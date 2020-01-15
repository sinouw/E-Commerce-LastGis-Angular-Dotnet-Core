import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import {BaseUrl} from '../../../models/baseurl.data';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-products',
	templateUrl: './Products.component.html',
	styleUrls: ['./Products.component.scss']
})

export class ProductsComponent implements OnInit {
	
	productsList 		      : any;
	productsListCopie		      : any;
	productsGrid 			   : any;
	popUpDeleteUserResponse : any;
	showType				: string = 'list';
	// displayedProductsColumns : string [] = ['id', 'image','name','brand','category', 'product_code', 'discount_price', 'price','action' ];
	displayedProductColumns : string [] = ['image','NomProduit','Marque','NsousCategorie', 'Remise', 'Prix','action' ];
	@ViewChild(MatPaginator,{static: false}) paginator : MatPaginator;
	@ViewChild(MatSort,{static: false}) sort           : MatSort;

	constructor(public translate : TranslateService,
					private router : Router, 
					private adminPanelService : AdminPanelServiceService,
					private genericservice : AdminGenericService) { }

	ngOnInit() {
		this.getDataInfo()
	}

	getDataInfo(){
		this.list().subscribe(res=>{
			this.getProductResponse(res)
			console.log(this.productsGrid);
		},
		err=>{
			console.log(err);
		})
	}

	//getProductResponse method is used to get the response of all products.
 	public getProductResponse(response) {
	  this.productsGrid = null;
	  this.productsGrid = response.Items;
	  this.productsListCopie = response.Items;
	  this.productShowType(this.showType)
   }

  	/**
	  * productShowType method is used to select the show type of product.
	  */
	productShowType(type) {
		this.showType = type;
		if(type == 'list'){
			document.getElementById('list').classList.add("active");
			document.getElementById('grid').classList.remove('active');
			// setTimeout(() => {
				this.productsList = new MatTableDataSource(this.productsGrid);
			// }, 2000);
			setTimeout(()=>{
				this.productsList.paginator = this.paginator;
				this.productsList.sort = this.sort;
			},0)
			
		}
		else{
			document.getElementById('grid').classList.add("active");
			document.getElementById('list').classList.remove('active');
		}
	}

	/**
	  * onEditProduct method is used to open the edit page and edit the product.
	  */
	onEditProduct(data){
		// this.router.navigate(['/admin-panel/product-edit',data.type,data.id]);
		this.router.navigate(['/admin-panel/product-edit',data.IdProd]);
		this.adminPanelService.editProductData = data;
		console.log(data);
		
	}

	/* 
     *deleteProduct method is used to open a delete dialog.
     */
   deleteProduct(id,i){
      this.adminPanelService.deleteDialog("Are you sure you want to delete this product permanently?").
         subscribe( res => {this.popUpDeleteUserResponse = res},
                    err => console.log(err),
                    ()  => this.getDeleteResponse(id,this.popUpDeleteUserResponse,i))
   }

   /**
     * getDeleteResponse method is used to delete a product from the product list.
     */
   getDeleteResponse(id,response : string,i){
      if(response == "yes"){
      	if(this.showType == 'grid') {
         	this.productsGrid.splice(i,1);
      	}else if(this.showType == 'list'){
				this.productsList.data.splice(i,1);
				this.productsList = new MatTableDataSource(this.productsGrid);
      		this.productsList.paginator = this.paginator;
		  }
		  this.deleteAProduct(id)
		  console.log(id);
		  
      }
   }

   SearchInGridList(value){
	this.productsGrid=this.productsGrid
	.filter(x=>
		x.NomProduit.toLowerCase().includes(value) ||
		x.Marque.toLowerCase().includes(value) || 
		x.NsousCategorie.toLowerCase().includes(value) || 
		x.Prix.toString().includes(value))
   }

   applyFilter(filterValue: string,event) {
	   let value =filterValue.trim().toLowerCase()
	   if(this.showType=='list'){
			this.productsList.filter = value;
			if (this.productsList.paginator) {
				this.productsList.paginator.firstPage();
			}
	   }else{
		this.SearchInGridList(value)		
		if(event=="Backspace"){
			this.SearchInGridList(value)			
		}
		if(value==null || value == ''){
			this.productsGrid=this.productsListCopie
			this.productsList = new MatTableDataSource(this.productsGrid);
		}
	   }
 }
	list(){
		return this.genericservice.get(BaseUrl+'/Produits')
	}

	deleteAProduct(id){
		this.genericservice.delete(BaseUrl+'/Produits/'+id)
		.subscribe(res=>{
			console.log(res);
		},
		err=>{
			console.log(err);
		})
	}

}
