import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CATEGORY_NAMES, Product } from 'src/app/models/product.model';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsPromiseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  product: Product;
  originalProduct: Product;

  categories = CATEGORY_NAMES.map((item) => {
    return {
      name: item,
    };
  });

  private sub: Subscription;

  ngOnInit(): void {
    this.route.data
      .pipe(map((value) => value.product))
      .subscribe((product: Product) => {
        this.product = { ...product };
        this.originalProduct = { ...product };
      });

    // we should recreate component because this code runs only once
    const id = +this.route.snapshot.paramMap.get('productID');
    const observer = {
      next: (product: Product) => {
        this.product = { ...product };
        this.originalProduct = { ...product };
      },
      error: (err: any) => console.log(err),
    };
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.createProduct(product);
    }
    this.originalProduct = { ...this.product };
    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['./products']);
  }
}
