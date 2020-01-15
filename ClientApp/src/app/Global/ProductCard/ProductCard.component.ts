import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'embryo-ProductCard',
  templateUrl: './ProductCard.component.html',
  styleUrls: ['./ProductCard.component.scss']
})
export class ProductCardComponent implements OnInit {

   @Input() product : any;

   @Input() index   : any;

   @Input() currency : string;

   @Input() type  : string = '';

   @Output() addToCart: EventEmitter<any> = new EventEmitter();

   @Output() addToWishlist: EventEmitter<any> = new EventEmitter();

   constructor() { }

   ngOnInit() {
   }

   public addToCartProduct(value:any) {
      this.addToCart.emit(value);
   }

   public productAddToWishlist(value:any, parentClass) {
      if(!(document.getElementById(parentClass).classList.contains('wishlist-active'))){
         let element = document.getElementById(parentClass).className += " wishlist-active";
      }
      this.addToWishlist.emit(value);
   }

   public checkCartAlready(singleProduct) {
      let products = JSON.parse(localStorage.getItem("cart_item")) || [];
      if (!products.some((item) => item.id == singleProduct.id)) {
         return true;
      }
   }

}
