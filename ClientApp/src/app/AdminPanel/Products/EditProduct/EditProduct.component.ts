import {Component, OnInit} from '@angular/core';
import {AdminPanelServiceService} from '../../Service/AdminPanelService.service';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {BaseUrl} from '../../../models/baseurl.data';
import {AdminGenericService} from '../../Service/AdminGeneric.service';
import { join } from 'path';
import { MatTableDataSource } from '@angular/material';
import { Caracteristique } from 'src/app/models/Caracteristique.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-edit-product',
    templateUrl: './EditProduct.component.html',
    styleUrls: ['./EditProduct.component.scss']
})

export class EditProductComponent implements OnInit {


    'data': any = [
        {
            'image': 'https://via.placeholder.com/625x800',
            'image_gallery': [
                'https://via.placeholder.com/625x800',
            ]
        }
    ];

    caracForm :FormGroup ;
    idImageDis = true
    souscategories: any[] = [];
    product: any;
    idProd;
    editProductDetail: any;
    mainImgPath: string;
    productId: any;
    productType: any;
    showStatus: boolean;
    form: FormGroup;
    imagenumber
    Images:any=[]
    ImagesPath:any=[]
    productImages: any = [];
    frontImg: string;
    Imagefront: any;
    DefaultFrontImgId: any;
    caracs : any[] = []
    caracteristiquesList
    displayedProductColumns : string [] = ['key','value','action' ];  


    constructor(
                public formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private genericservice: AdminGenericService,
                private http:HttpClient
    ) {

        this.caracForm = this.formBuilder.group({
            key: ['', [Validators.required]],
            value: ['', [Validators.required]]
       });
        this.getSousCategories();
        this.form = this.formBuilder.group({
            NomProduit: [],
            Prix: [],
            Disponible: [],
            Description: [],
            IdScat: [],
            Marque: [],
            IdProd: []
        });

        this.idProd = this.route.snapshot.paramMap.get('id');
       
        this.getProduct(this.idProd)
            .subscribe((res:any) => {
                this.product = res;
                let caracteristiques = this.product.Caracteristiques;
                console.log(this.product)
                
                caracteristiques.forEach(x=>
                    this.caracs.push({
                        IdCarac:x.IdCarac,
                        key:x.Key,
                        value:x.Value
                    })
                    )

                    this.caracteristiquesList = new MatTableDataSource(this.caracs),
                   
                
                
                this.Images=res.Images
                this.getProductData();
                this.Images.forEach(e => {
                    this.ImagesPath.push(e.ImageName)
                });
                this.imagenumber = this.ImagesPath.length
                this.mainImgPath=this.product.FrontImg
                this.data[0].image_gallery=this.ImagesPath
            });

    }

    ngOnInit() {
            
        

    }



    //getProductData method is used to get the product data.
    getProductData() {
        this.form.patchValue({
            NomProduit: this.product.NomProduit,
            Prix: this.product.Prix,
            Disponible: this.product.Disponible,
            Description: this.product.Description,
            IdScat: this.product.IdScat,
            Marque: this.product.Marque,
            IdProd: this.idProd
        });

       
        for (let i = this.data[0].image_gallery.length ; i > this.imagenumber ; i--) {
            this.data[0].image_gallery.splice(0,1)
        }  

        this.productImages=[]
        this.productImages.forEach(e => {
            this.productImages.push(this.data[0].image_gallery)

        });        
    }

    getProduct(id): any {
        return this.genericservice.get(BaseUrl + '/Produits/AdminProduits/' + id);
    }

    getSousCategories() {
        this.genericservice.get(BaseUrl + `/souscategories`)
            .subscribe(res => {
                this.souscategories = res;
                console.log(res);
            }, err => {
                console.log(err);
            });
    }

    OnSubmit() {
        // console.log(this.form.value);

        this.genericservice.put(BaseUrl + '/Produits/' + this.idProd, this.form.value)
            .subscribe(res => {
                this.UploadImages(this.form.value.IdProd);
                this.editFrontImg()
                    console.log(res);
                },
                err => {
                    console.log(err);
                });
    }


    /**
     * getImagePath is used to change the image path on click event.
     */
    public getImagePath(imgPath: string, index: number) {

        if(imgPath==this.mainImgPath){
            this.idImageDis=false
        }else{
            this.idImageDis = false

        }
        //  console.log(imgPath,index);
        this.frontImg = imgPath;
        document.querySelector('.border-active').classList.remove('border-active');
        this.mainImgPath = imgPath;
        document.getElementById(index + '_img').className += ' border-active';
       
    }

    UploadImage(files) {
        this.productImages.push(files[0]);
        var file: File = files[0];
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.mainImgPath = event.target.result;
            this.data[0].image_gallery.splice(0, 0, this.mainImgPath);
        };
        reader.readAsDataURL(file);

    }


    UploadImages(id) {
        this.genericservice.postProductImages(this.productImages, id)
            .then(res => {
                console.log(res);
            },
            err=>console.log(err)
            );
    }


    editFrontImg(){
        let body
        this.DefaultFrontImgId = this.product.Images.find(x=>x.ImageName==this.mainImgPath)
         this.Imagefront= this.product.Images.find(x=>x.ImageName==this.frontImg)
        
         if(this.Imagefront){
            // this.Imagefront=this.Imagefront.IdImage
             body = {
                GenericGuid:this.Imagefront.IdImage,
                GenericString:"hello"
            }
        }

        else{
            body = {
                GenericGuid:this.DefaultFrontImgId.IdImage,
                GenericString:"hello"
            }
        }
            
        this.genericservice.put(BaseUrl+"/images/produit/FrontImg/"+this.idProd,body)
        .subscribe(res=>{
           console.log(res);
           this.idImageDis = true    
       },
       err=>{
       console.log(err);

       })
    }

    deleteCaracteristique(id){
        this.http.delete(BaseUrl+'/Caracteristiques/'+id)
        .subscribe(res=>{
            console.log(res);
        },
        err=>{
        console.log(err);
 
        })
    }

  

    deleteRow(element,index) {  
        if(this.caracs.length ==0) {  
          console.log("Can't delete the row when there is only one row", 'Warning');  
            return false;  
        } else {  
            this.caracs.splice(index, 1);  
            this.deleteCaracteristique(element.IdCarac)
            this.caracteristiquesList = new MatTableDataSource(this.caracs);
            console.log('Row deleted successfully', 'Delete row');  
            return true;  
        }  
    }

    AddCaracteristique(body){
        return this.http.post(BaseUrl+'/Caracteristiques',body)
    }


    validate(){
        console.log(this.caracForm.value);
        let body1 = {
            Key:this.caracForm.value.key,
            Value:this.caracForm.value.value,
            ProduitId:this.idProd
        }
        console.log("body", body1);

        this.AddCaracteristique(body1)
        .subscribe((res:any) => {
            console.log(res);

            let body = {
                IdCarac:res.IdCarac,
                key:res.Key,
                value:res.Value
            }

            this.caracs.push(body)
            this.caracteristiquesList = new MatTableDataSource(this.caracs);
            console.log(this.caracs);
        }, err => {
            console.log(err);
        });

      
        
        
        this.caracForm.patchValue({
            key:'',
            value:''
        })
        
        console.log(this.caracForm.value);
    }
    
}
