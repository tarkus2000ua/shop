import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(public productsService: ProductsPromiseService, private router: Router) {}

  ngOnInit(): void {
    this.productsService
    .getProducts()
    .then((products) => (this.products = products));
}

  onProductSelected(product: Product): void {
      const link = ['admin', 'product', 'edit', product.id];
      this.router.navigate(link);
  }

  onAddProduct(): void {
    const link = ['admin', 'product', 'add'];
    this.router.navigate(link);
  }

  trackByItems(index: number, item: Product): number {
      return item.id;
  }
}
