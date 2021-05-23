import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    ProductComponent,
    ProductListComponent,
  ]
})
export class ProductsModule { }
