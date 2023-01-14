import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  param: any;
  cartProducts: any[] = [];

  constructor(private route: ActivatedRoute) { 

    this.route.queryParams.subscribe(params => {
      this.param = params;
      
  });
  }

  ngOnInit(): void {
  }
  //add to cart event fire by EventEmitter
  addToCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let isExist = this.isInCart(this.param, this.cartProducts);
      if (isExist) {
        this.alertMessage('this item already in the Cart..');
      } else {
        this.cartProducts.push(this.param);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.alertMessage('item added to the Cart..');
      }
    } else {
      this.cartProducts.push(this.param);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.alertMessage('item added to the Cart..');
    }
  }

  //check if Item is taken before or not
  private isInCart(itemToAdd: any, allCartitems: any[]): boolean {
    return allCartitems.find((i) => i.id === itemToAdd.id);
  }

  alertMessage(message: string) {
    alert(message);
  }
}
