import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    products: Product[];
    selectedProduct: Product;

    constructor(public productsService: ProductsService, private router: Router) {}

    onProductSelected(product: Product): void {
        const link = ['/product', product.id];
        this.router.navigate(link);
    }

    trackByItems(index: number, item: Product): number {
        return item.id;
    }
}
