import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductItemComponent } from './products/components/product-item/product-item.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';

//import all components of home module inside this array 
export const COMPONENTS = [
  ProductsListComponent,
  ProductItemComponent, HomeComponent

];

const routes: Routes = [

  {
    path: '',
    component: HomeComponent, 
    children: [
      {
        path: 'list',
        component: ProductsListComponent
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent,
        canActivate: [AuthGuard],
      },


      {
        path: '**',
        redirectTo: 'list',
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
