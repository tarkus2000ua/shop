import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap, take } from 'rxjs/operators';
import { CartObservableService } from 'src/app/cart/services/cart-observable.service';

import { CATEGORY_NAMES, Product } from '../../../models/product.model';
import { ProductsPromiseService } from '../../services/products-promise.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  @Output() buy = new EventEmitter<Product>();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsPromiseService,
    private cartService: CartObservableService
  ) {}

  ngOnInit(): void {
    const observer = {
      next: (product: Product) => (this.product = { ...product }),
      error: (err: any) => console.log(err),
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.productsService.getProduct(+params.get('id'))
        )
      )
      .subscribe(observer);
  }

  onBuy(): void {
    this.cartService.addProduct({ ...this.product }).pipe(take(1)).subscribe();
  }

  getCategoryName(id: number): string {
    return CATEGORY_NAMES[id];
  }
}
