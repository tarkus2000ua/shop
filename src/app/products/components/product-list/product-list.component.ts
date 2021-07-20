import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../models/product.model';
import { ProductsPromiseService } from '../../services/products-promise.service';

// @Ngrx
import { Store } from '@ngrx/store';
import { selectProductsData, selectProductsError, selectProductsDataPartial } from './../../../core/@ngrx';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';

// rxjs
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  selectedProduct: Product;
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  constructor(
    public productsService: ProductsPromiseService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    console.log('We have a store! ', this.store);

    this.products$ = this.store.select(selectProductsData);
    this.productsError$ = this.store.select(selectProductsError);
    this.store.dispatch(ProductsActions.getProducts());
  }

  onProductSelected(product: Product): void {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }

  trackByItems(index: number, item: Product): number {
    return item.id;
  }
}
