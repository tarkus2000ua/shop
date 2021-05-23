import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CATEGORY_NAMES, Product } from '../../../models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    @Input() product: Product;
    @Output() buy = new EventEmitter<Product>();

    constructor() {}

    onBuy(product: Product): void {
        console.log(`You've just added ${product.name} to the cart`);
        this.buy.emit(product);
    }

    getCategoryName(id: number): string {
        return CATEGORY_NAMES[id];
    }
}
