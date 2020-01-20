import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { AdminGenericService } from '../../Service/AdminGeneric.service';
import { BaseUrl } from 'src/app/models/baseurl.data';

@Component({
	selector: 'app-reports',
	templateUrl: './Reports.component.html',
	styleUrls: ['./Reports.component.scss']
})

export class ReportsComponent implements OnInit {
  
   tableTabData        : any;
   buySellChartContent : any;
   chartData           : any;
   PubImages: any = [];
   DBPubImages: any = [];
   ImagesPath: any = ['https://via.placeholder.com/625x800'];

   displayedTransactionColumns : string [] = ['transid','date','account', 'type', 'amount','debit', 'balance'];

   displayedTransferColumns : string [] = ['transid','date','account', 'type', 'amount', 'balance','status'];

   displayedExpenseColumns : string [] = ['itmNo','date', 'type','companyName','amount','status'];
	
   constructor(private genericservice : AdminGenericService) {
   }


   'data': any = [
      {
          'image': 'https://via.placeholder.com/625x800',
          'image_gallery': [
              'https://via.placeholder.com/625x800',
          ]
      }
  ];


   // mainImgPath = "Uploads/PubImages/1134mb5-blue-ngpu-nc-wt-nos-p-genmon-septem-genhs-vbbkmat.jpg"
   mainImgPath 

   ngOnInit() {
      
      this.getpubImages()
       
      
      
   }

   public getImagePath(imgPath: string, index: number) {
      //  console.log(imgPath,index);
            if(imgPath!='https://via.placeholder.com/625x800'){
      console.log(index);
      
      console.log(imgPath);

            document.querySelector('.border-active').classList.remove('border-active');
            this.mainImgPath = imgPath;
            document.getElementById(index + '_img').className += ' border-active';
         }
     
  }


   getpubImages(){
      this.data[0].image_gallery=[]   
      this.ImagesPath = ['https://via.placeholder.com/625x800'];

     this.genericservice.get(BaseUrl+'/PubImages/')
     .subscribe(res=>{
      // console.log(res);
      this.DBPubImages=res
      console.log(this.DBPubImages);

      this.DBPubImages.forEach(e => {
         this.ImagesPath.unshift(e.PubImageName)
      });
      this.mainImgPath =this.ImagesPath[0]
      console.log("Main Image Path : ",this.mainImgPath);
      this.data[0].image_gallery=this.ImagesPath
         console.log("gallery images : " ,this.data[0].image_gallery);
      
   },
   err=>{
      console.log(err);
      
   })

   }


   UploadImage(files) {
      this.PubImages.push(files[0]);
      console.log("PubImages : ",this.PubImages);
      let file: File = files[0];
      let reader = new FileReader();
      reader.onload = (event: any) => {
          this.mainImgPath = event.target.result;
          this.data[0].image_gallery.splice(0, 0, this.mainImgPath);
      };
      reader.readAsDataURL(file);

  }

  DeletePubImage(path=this.mainImgPath){
   let id=null
   
   if(path!=null)
   {
      id =path.split("/")[2]
      console.log(id);
      
      this.DeleteImagesDB(id)

   }
   else
   console.log("notfound");
   
  }
  

  DeleteImagesDB(id){
   this.genericservice.delete(BaseUrl+'/PubImages/'+id)
   .subscribe(res => {
      console.log(res);
      setTimeout(() => {
         this.getpubImages()
      }, 1000);
      // helloworld!!!   
   },
   err=>console.log(err)
   );
  }

  UploadImages() {

      this.genericservice.postPubImages(this.PubImages)
          .then(res => {
              console.log(res);
              this.PubImages.length=0
              setTimeout(() => {
                 this.getpubImages()
              }, 2000);

              
          },
          err=>console.log(err)
          );
  }

 

}
