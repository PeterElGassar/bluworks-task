import { ProductsService } from './products/products.service';
import { SharedModule } from 'src/app/@shered/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { COMPONENTS, HomeRoutingModule } from './home-routing.module';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';

// import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [...COMPONENTS, ProductDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    // NgxPaginationModule
  ],
  providers:[ProductsService]
})
export class HomeModule { }
