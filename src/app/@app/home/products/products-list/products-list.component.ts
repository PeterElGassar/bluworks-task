import { ProductsService } from './../products.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/@app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/@core/data/Product';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],

  providers: [ProductsService],
})
export class ProductsListComponent implements OnInit {
  productList: Product[] = [];
  categories: any;
  pageNumber: number = 1;
  filteredProducts: any[];
  finalProductList: any[];
  returnUrl: string;
  cartProducts: any[] = [];
  listOfCheckBoxes: any;
  isCategoryOpen:boolean=true;
  isPriceOpen:boolean=true;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.authService.loadCurrentUser();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductsCategories();
    this.getCurrentLoggedInUser();
    this.authService.currentUser$.subscribe((res) => {});
  }

  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    if (value === '') {
      this.filteredProducts = this.productList;
      this.finalProductList = this.productList;
    }
    // this.filteredAllCourses = this.filteredCourses(value);
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((res: any) => {
      if (res) {
        this.productList = res.products;
        this.filteredProducts = res.products;
        this.finalProductList = res.products;
      }
    });
  }

  getAllProductsCategories() {
    this.productsService.getAllProductsCategories().subscribe((res: any) => {
      if (res) {
        this.categories = res;
      }
    });
  }

  getCurrentLoggedInUser() {
    this.authService.currentUserSubject.subscribe(
      (res: any) => {
        if (res) {
        }
      },
      (error) => {}
    );
  }

  filterByCategory() {
    this.listOfCheckBoxes = document.getElementsByClassName('cat-check');
    let allNotChecked = false;
    this.filteredProducts = [];
    // this.finalProductList = [];

    for (let i = 0; i < this.listOfCheckBoxes.length; i++) {
      if (this.listOfCheckBoxes[i].checked) {
        allNotChecked = true;
        let filter = this.productList.filter(
          (item: any) => item.category === this.listOfCheckBoxes[i].id
        );
        this.filteredProducts.push(...filter);
      }
    }
    // this.finalProductList.push(...this.filteredProducts);
    //If All Checkboxes Not Checked getAll
    if (!allNotChecked) this.filteredProducts = this.productList;
  }

  filterByPriceRange() {
    this.listOfCheckBoxes = document.getElementsByClassName('price-check');
    let allNotChecked = false;
    this.filteredProducts = [];

    for (let i = 0; i < this.listOfCheckBoxes.length; i++) {
      if (this.listOfCheckBoxes[i].checked) {
        //max & min
        let minPrice = +this.listOfCheckBoxes[i].getAttribute('data-min');
        let maxPrice = +this.listOfCheckBoxes[i].getAttribute('data-max');
        allNotChecked = true;
        let filter = this.productList.filter(
          (item: any) => item.price >= minPrice && item.price <= maxPrice
        );
        this.filteredProducts.push(...filter);
      }
    }
    //If All Checkboxes Not Checked getAll
    if (!allNotChecked) this.filteredProducts = this.productList;
  }

  onSearch(val: string) {
    this.filteredProducts = this.filteredProductsList(val);
  }

  filteredProductsList(searchString: string): any[] {

    if (searchString.trim() === '') {
      return this.productList.filter(
        (product: any) =>
          product.title
            .toLocaleLowerCase()
            .indexOf(searchString.toLocaleLowerCase()) !== -1
      );
    }

    return this.filteredProducts.filter(
      (product: any) =>
        product.title
          .toLocaleLowerCase()
          .indexOf(searchString.toLocaleLowerCase()) !== -1
    );
  }

  //add to cart event fire by EventEmitter
  addToCart(item: Product) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let isExist = this.isInCart(item, this.cartProducts);
      if (isExist) {
        this.alertMessage('this item already in the Cart..');
      } else {
        this.cartProducts.push(item);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
        this.alertMessage('item added to the Cart..');
      }
    } else {
      this.cartProducts.push(item);
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
  onCategoryOpen(){
this.isCategoryOpen= !this.isCategoryOpen;
  }
  onPriceOpen(){
this.isPriceOpen= !this.isPriceOpen;
  }
}
