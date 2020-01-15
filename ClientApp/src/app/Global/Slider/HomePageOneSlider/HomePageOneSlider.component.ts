import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { BaseUrl } from 'src/app/models/baseurl.data';

@Component({
  selector: 'embryo-HomePageOneSlider',
  templateUrl: './HomePageOneSlider.component.html',
  styleUrls: ['./HomePageOneSlider.component.scss']
})
export class HomePageOneSliderComponent implements OnInit, OnChanges {

   @Input() isRTL : boolean = false;

   slideConfig : any;
   PubImages: any = [];
   ImagesPath: any = [];

   constructor(private genericservice : AdminGenericService) { }

   ngOnInit() {
      this.getpubImages()
      .subscribe(res=>{
        this.PubImages=res
        console.log("Pubs Images",this.PubImages);

        this.PubImages.forEach(e => {
           this.ImagesPath.push(e.PubImageName)
         });
     },
     err=>{
        console.log(err);
        
     })
   }

   ngOnChanges() {
      this.slideConfig = {
         slidesToShow: 1,
         slidesToScroll:1,
         autoplay: true,
         autoplaySpeed: 2000,
         dots: false,
         rtl: this.isRTL,
         responsive: [
          {
             breakpoint: 768,
             settings: {
                arrows: false,
                slidesToShow: 1
             }
             },
          {
             breakpoint: 480,
             settings: {
                arrows: false,
                slidesToShow: 1
             }
          }
         ]
      };
   }



   getpubImages(){
      return this.genericservice.get(BaseUrl+'/PubImages')
    }

}
