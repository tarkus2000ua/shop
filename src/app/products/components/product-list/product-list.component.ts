import { Component } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../../models/product.model';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
    products: Product[];
    selectedProduct: Product;

    constructor(public productsService: ProductsService, private cartService: CartService) {}

    onProductSelected(selected: Product): void {
        this.selectedProduct = selected;
    }

    onBuy(item: Product): void {
        this.cartService.addProduct({...item});
    }

    trackByItems(index: number, item: Product): number {
        return item.id;
    }
}
