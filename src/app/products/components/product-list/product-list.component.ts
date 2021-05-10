import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../../models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    products: Product[];
    selectedProduct: Product;

    constructor(private productsService: ProductsService, private cartService: CartService) {}

    ngOnInit(): void {
        this.products = this.productsService.getProducts();
    }

    onProductSelected(selected: Product): void {
        this.selectedProduct = selected;
    }

    onBuy(id: number): void {
        this.cartService.addItem(this.products.find(product => product.id === id));
    }

    trackByItems(index: number, item: Product): number {
        return item.id;
    }
}
