import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, CanDeactivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CATEGORY_NAMES, Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsService,
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
    // this.product = new User(null, '', '');

    this.route.data.pipe(pluck('product')).subscribe((product: Product) => {
      console.log(product);
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
    this.sub = this.productsService.getProduct(id).subscribe(observer);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSaveProduct(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.createProduct(product);
    }
    this.originalProduct = { ...this.product };
  }

  onGoBack(): void {
    this.router.navigate(['./products']);
  }
}
