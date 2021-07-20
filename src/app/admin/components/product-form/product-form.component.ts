import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CATEGORY_NAMES, Product } from 'src/app/models/product.model';

// @NgRx
import { Store } from '@ngrx/store';
import { selectSelectedProductByUrl } from './../../../core/@ngrx';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store
  ) {}

  private componentDestroyed$: Subject<void> = new Subject<void>();
  product: Product;
  originalProduct: Product;

  categories = CATEGORY_NAMES.map((item) => {
    return {
      name: item,
    };
  });

  private sub: Subscription;

  ngOnInit(): void {

    const observer: any = {
      next: (product: Product) => {

          this.product = {...product};
      },
      error(err: Error): void {
        console.log(err);
      },
      complete(): void {
        console.log('Stream is completed');
      },
    };

    this.store
      .select(selectSelectedProductByUrl)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(observer);

  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.store.dispatch(ProductsActions.updateProduct({ product }));
    } else {
      this.store.dispatch(ProductsActions.createProduct({ product }));
    }

    this.originalProduct = { ...this.product };
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['./products']);
  }
}
