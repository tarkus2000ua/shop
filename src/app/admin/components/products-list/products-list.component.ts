import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';

// @Ngrx
import { Store } from '@ngrx/store';
import { selectProductsData, selectProductsError, selectProductsDataPartial } from './../../../core/@ngrx';
import * as ProductsActions from '../../../core/@ngrx/products/products.actions';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  selectedProduct: Product;
  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  constructor(
    public productsService: ProductsPromiseService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsData);
    // this.tasks$ = this.store.select(selectTasksDataPartial, { count: 2});
    this.productsError$ = this.store.select(selectProductsError);

    this.store.dispatch(ProductsActions.getProducts());
  }

  onProductSelected(product: Product): void {
    const link = ['admin', 'product', 'edit', product.id];
    this.router.navigate(link);
  }

  onAddProduct(): void {
    const link = ['admin', 'product', 'add'];
    this.router.navigate(link);
  }

  onDeleteProduct(product: Product): void {
    const productToDelete: Product = { ...product };
    this.store.dispatch(
      ProductsActions.deleteProduct({ product: productToDelete })
    );
  }

  trackByItems(index: number, item: Product): number {
    return item.id;
  }
}
