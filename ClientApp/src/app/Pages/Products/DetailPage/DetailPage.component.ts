import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import {BaseUrl} from '../../../models/baseurl.data';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-DetailPage',
  templateUrl: './DetailPage.component.html',
  styleUrls: ['./DetailPage.component.scss']
})
export class DetailPageComponent implements OnInit {
   'data': any = [
      {
          'image': 'https://via.placeholder.com/625x800',
          'image_gallery': [
              'https://via.placeholder.com/625x800',
          ]
      }
  ];
   Product              :any
   id                : any;
   type              : any;
   apiResponse       : any;
   singleProductData : any;
   productsList      : any;
   mainImgPath: any;
   Images: any = [];
   ImagesPath: any= [];
   pageNumber: any= 0;
   pageSize: any = 4;
   productsGrid: any;
   caracs: any=[];
   caracteristiquesList: any;
   displayedProductColumns : string [] = ['key','value']; 
   soucategName: any;

   constructor(private route: ActivatedRoute,
              private router: Router,
              public embryoService: EmbryoService,
              private genericservice : AdminGenericService) {
      
   }

   ngOnInit() {
      this.route.params.subscribe(res => {
         this.id = res.id;
         this.type = res.type;
         this.getData();
      })
      console.log(this.id);
      
      this.getProduct()
      
   }

   getProducts(){
      this.list().subscribe((res:any)=>{
         console.log("Products: ",res);
         this.productsGrid=res.Items
   },
   err=>{
      console.log(err);
   })
   }


   public getData() {
      this.embryoService.getProducts().valueChanges().subscribe(res => this.checkResponse(res));
   }

   list(){
		// return this.genericservice.get(BaseUrl+'/Produits?&page=2&pageSize=4')
      return this.genericservice
      .get(BaseUrl+'/Produits/search?&page='+this.pageNumber+'&pageSize='+this.pageSize+'&filter='+this.Product.NsousCategorie)
   	}

   public checkResponse(response) {
      // this.productsList = null;
      // this.productsList = response[this.type];
      // for(let data of this.productsList)
      // {
      //    if(data.id == this.id) {
      //       this.singleProductData = data;
      //       break;
      //    }
      // }
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value) {
      this.embryoService.addToWishlist(value);
   }

   getProduct(){
      this.genericservice.get(BaseUrl+'/produits/'+this.id)
      .subscribe(res=>{
         this.Product=res
         this.mainImgPath=res.FrontImg
         this.Images=res.Images
         this.getProducts()
         let caracteristiques = this.Product.Caracteristiques;
         console.log(this.Product)
         
         caracteristiques.forEach(x=>
             this.caracs.push({
                 IdCarac:x.IdCarac,
                 key:x.Key,
                 value:x.Value
             })
             )
             this.caracteristiquesList = new MatTableDataSource(this.caracs),

         this.Images.forEach(e => {
            this.ImagesPath.push(e.ImageName)
        });

        this.data[0].image_gallery=this.ImagesPath

         console.log(this.Product);
      },
      err=>{
         console.log(err);
         
      })
   }
redirecttoCatpage(){
   this.router.navigate(['/products', this.Product.NsousCategorie]);
}

  /**
     * getImagePath is used to change the image path on click event.
     */
    public getImagePath(imgPath: string, index: number) {
      // console.log(imgPath,index);
      document.querySelector('.border-active').classList.remove('border-active');
      this.mainImgPath = imgPath;
      document.getElementById(index + '_img').className += ' border-active';
  }

}
