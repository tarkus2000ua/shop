import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as ProductsActions from './products.actions';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, map, pluck, switchMap } from 'rxjs/operators';
import { ProductsPromiseService } from './../../../products/services/products-promise.service';
import { Product } from 'src/app/models/product.model';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private productsPromiseService: ProductsPromiseService
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap((action) =>
        // Notice!
        // If you have a connection to the Firebase,
        // the stream will be infinite - you have to unsibscribe
        // This can be performed following this pattern
        // this.taskObservableService
        // .getTasks()
        // .pipe(takeUntil(this.actions$.pipe(ofType(TasksActions.TaskListComponentIsDestroyed))
        // If you use HttpClient, the stream is finite,
        // so you have no needs to unsibscribe
        this.productsPromiseService
          .getProducts()
          .then((products) => ProductsActions.getProductsSuccess({ products }))
          .catch((error) => ProductsActions.getProductsError({ error }))
      )
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      pluck('product'),
      concatMap((product: Product) =>
        this.productsPromiseService
          .createProduct(product)
          .then((createdProduct: Product) => {
            this.router.navigate(['/products']);
            return ProductsActions.createProductSuccess({
              product: createdProduct,
            });
          })
          .catch((error) => ProductsActions.createProductError({ error }))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      pluck('product'),
      concatMap((product: Product) =>
        this.productsPromiseService
          .updateProduct(product)
          .then((updatedProduct: Product) => {
            this.router.navigate(['/products']);
            return ProductsActions.updateProductSuccess({
              product: updatedProduct,
            });
          })
          .catch((error) => ProductsActions.updateProductError({ error }))
      )
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      pluck('product'),
      concatMap((product: Product) =>
        this.productsPromiseService
          .deleteProduct(product)
          .then(
            (/* method delete for this API returns nothing, so we will use previous task */) => {
              return ProductsActions.deleteProductSuccess({ product });
            }
          )
          .catch((error) => ProductsActions.deleteProductError({ error }))
      )
    )
  );
}
