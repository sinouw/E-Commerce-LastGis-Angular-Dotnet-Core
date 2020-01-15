import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'embryo-DealOfTheDay',
  templateUrl: './DealOfTheDay.component.html',
  styleUrls: ['./DealOfTheDay.component.scss']
})
export class DealOfTheDayComponent implements OnInit {

   @Input() singleProduct : any; 

   @Input() currency : string;

   counterDateTime = new Date(new Date().setHours(20,0,0,0));

   constructor() {}

   ngOnInit() {
   }

   /**
    * getOfferImagePath is used to change the image path on click event. 
    */
   public getOfferImagePath(imgPath: any, index:number) {
      document.querySelector('.border-active').classList.remove('border-active');
      this.singleProduct.image = imgPath;
      document.getElementById(index+'_img').className += " border-active";
   }

}
