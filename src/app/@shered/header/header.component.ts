import { Product } from './../../@core/data/Product';
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/@app/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/@core/data/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User = {};
  searchTerm: string = '';

  @Input() cartProducts: Product[];
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService,private router:Router) {
    this.currentUser$ = this.authService.currentUser$;
    this.authService.loadCurrentUser();

  }
  currentUser$: Observable<User>;

  ngOnInit(): void {

    this.authService.currentUser$.subscribe(res => {
      this.currentUser = res;
    });
    this.initalCart();
  }
  onSearchProduct() {
    this.onSearch.emit(this.searchTerm)
  }

  initalCart() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    }
  }
  navigate(){
    this.router.navigateByUrl('/auth/login')
  }
  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Cleared');
  }


}
