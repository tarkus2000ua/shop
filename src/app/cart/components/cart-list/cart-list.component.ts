import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CartItem } from './../../../models/CartItem.model';
import { Product } from '../../../models/product.model';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
    items: CartItem[];
    totalQuantity: number;
    totalSum: number;
    sortOptions = ['name', 'price', 'count'];
    sortField: string;
    isAsc = true;

    @ViewChild('selector') selector;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cartChanged.subscribe((items) => (this.items = items));
        this.cartService.quantityChanged.subscribe((quantity) => (this.totalQuantity = quantity));
        this.cartService.totalChanged.subscribe((sum) => (this.totalSum = sum));
    }

    trackByItems(index: number, item: Product): number {
        return item.id;
    }

    onIncrease(index: number, quantity: number): void {
        this.cartService.increaseQuantity(index, quantity);
    }

    onDecrease(index: number, quantity: number): void {
        this.cartService.decreaseQuantity(index, quantity);
    }

    onDelete(index: number): void {
        this.cartService.removeProduct(index);
    }

    onRemoveAll(): void {
        this.cartService.removeAllProducts();
    }
}
