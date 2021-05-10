import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductComponent,
    ProductListComponent,
  ],
  exports: [
    ProductComponent,
    ProductListComponent,
  ]
})
export class ProductsModule { }
