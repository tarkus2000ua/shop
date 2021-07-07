import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../models/product.model';
import { ProductsPromiseService } from '../../services/products-promise.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(
    public productsService: ProductsPromiseService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.productsService
      .getProducts()
      .then((products) => (this.products = products));
  }

  onProductSelected(product: Product): void {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }

  trackByItems(index: number, item: Product): number {
    return item.id;
  }
}
