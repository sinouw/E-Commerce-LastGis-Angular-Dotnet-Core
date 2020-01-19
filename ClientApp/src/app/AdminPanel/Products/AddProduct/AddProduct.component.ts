import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import {AdminGenericService} from '../../Service/AdminGeneric.service';
import {Caracteristique} from '../../../models/Caracteristique.model';
import {BaseUrl} from '../../../models/baseurl.data';
import {HttpEventType, HttpHeaders, HttpClient} from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-add-product',
    templateUrl: './AddProduct.component.html',
    styleUrls: ['./AddProduct.component.scss']
})

export class AddProductComponent implements OnInit {


    addProductBtnDisa = true
    form: FormGroup;
    mainImgPath: string;
    // colorsArray: string[] = ['Red', 'Blue', 'Yellow', 'Green'];
    sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
    quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    public imagePath;
    souscategories: any[] = [];
    productImages: any [] = [];
    base64Image: any;
    caracteristiques : Caracteristique[]=[];
    caracteristiquesList
    displayedProductColumns : string [] = ['key','value','action' ];  
    caracForm :FormGroup ;
    sousCateg:any = ""; 

    
    'data': any = [
        {
            'image': 'https://via.placeholder.com/625x800',
            'image_gallery': [
                'https://via.placeholder.com/625x800',
            ]
        }
    ];
    keysList: any=[];

    constructor(public formBuilder: FormBuilder,
                private genericservice: AdminGenericService,
                private http : HttpClient) {
    }

    ngOnInit() {

       this.caracForm = this.formBuilder.group({
        key: ['', [Validators.required]],
        value: ['', [Validators.required]]
   });


 
        this.getSousCategories();
        this.mainImgPath = this.data[0].image;
        this.form = this.formBuilder.group({
            NomProduit: ['', [Validators.required]],
            Prix: ['', [Validators.required]],
            Disponible: ['', [Validators.required]],
            Description: ['', [Validators.required]],
            IdScat: ['', [Validators.required]],
            Marque: ['', [Validators.required]],
        });
    }

    /**
     * getImagePath is used to change the image path on click event.
     */
    public getImagePath(imgPath: string, index: number) {
        document.querySelector('.border-active').classList.remove('border-active');
        this.mainImgPath = imgPath;
        document.getElementById(index + '_img').className += ' border-active';
    }

    onSubmit() {
        this.AddProduct();
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

    AddProduct() {
        this.genericservice.post(BaseUrl + '/Produits', this.form.value)
            .subscribe((res:any) => {
                    console.log(res);
                        this.UploadImages(res.IdProd);
                        this.AddingCaracteristiques(res.IdProd)
                    
                    this.Discard();
                },
                err => {
                    console.log(err);
                });
    }

    onsouscategchange(){
       this.keysList.length=0
        console.log(this.sousCateg);
        if (this.sousCateg!="") {
            this.http.get(BaseUrl+'/Caracteristiques/bysouscaterie?sousCategorie='+this.sousCateg)
            .subscribe((res:any)=>{
                console.log(res);
                // this.keysList
                res.forEach(carac => {
                    this.keysList.push(carac.Key)
                });
                console.log(this.keysList);
                
            },
            err=>{
                console.log(err);
            })         
        }
        
    }
 

    Discard() {
        this.form = this.formBuilder.group({
            NomProduit: [],
            Prix: [],
            Disponible: [],
            Description: [],
            IdScat: [],
            Marque: [],
        });
        
        this.caracForm.patchValue({
            key:'',
            value:''
        })

        this.caracteristiquesList=[]
        this.productImages=[]
        this.caracteristiques=[]
        this.mainImgPath = this.data[0].image;
        this.data[0].image_gallery = []
        this.data[0].image_gallery.splice(0, 0, this.mainImgPath);
        this.addProductBtnDisa = true
    }

    UploadImages(id) {
        this.postProductImages(this.productImages, id)
            .then(res => {
                console.log(res);
                this.UpdateFrontImg(id)
            },
            err=>console.log(err)
            );
    }


    postProductImages(files: any [], productId: string){
        return new Promise((resolve, reject) => {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file, file.name);
                this.http
                    .post(BaseUrl+'/images/produit/' + productId, formData)
                    .subscribe(event => {
                        console.log(event);
                    },
                    err=>console.error(err)
                    );
            }
            resolve(true);
        });
    }



    UploadImage(files) {
        this.productImages.push(files[0]);
        console.log(this.productImages);
        var file: File = files[0];
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.mainImgPath = event.target.result;
            this.data[0].image_gallery.splice(0, 0, this.mainImgPath);
        };
        reader.readAsDataURL(file);

        this.addProductBtnDisa = false

    }


    UpdateFrontImg(id){
       this.genericservice.put(BaseUrl,'/images/produit/updateFrontImg/'+ id)
       .subscribe(res => {
        console.log(res);
    },
    err=>console.log(err)
    );
       
    }


    deleteRow(index) {  
        if(this.caracteristiques.length ==0) {  
          console.log("Can't delete the row when there is only one row", 'Warning');  
            return false;  
        } else {  
            this.caracteristiques.splice(index, 1);  
            this.caracteristiquesList = new MatTableDataSource(this.caracteristiques);
            console.log('Row deleted successfully', 'Delete row');  
            return true;  
        }  
    } 


    validate(){
        console.log(this.caracForm.value);
        
        this.caracteristiques.push(this.caracForm.value)
        this.caracteristiquesList = new MatTableDataSource(this.caracteristiques);
        console.log(this.caracteristiques);
        
        
        this.caracForm.patchValue({
            key:'',
            value:''
        })
        
        console.log(this.caracForm.value);
    }



  AddingCaracteristiques(id){
   
    this.caracteristiques.forEach(carac => {
        let body={
            Key:carac.key,
            Value:carac.value,
            ProduitId:id
        }

        this.http.post(BaseUrl+'/Caracteristiques',body)
        .subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        });

    });
  }


}
