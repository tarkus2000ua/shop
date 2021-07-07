import { Component, OnInit, ViewChild } from '@angular/core';

import { CartItem } from './../../../models/CartItem.model';
import { Product } from '../../../models/product.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartObservableService } from '../../services/cart-observable.service';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
    items$: Observable<CartItem[]>;
    totalQuantity: number;
    totalSum: number;
    sortOptions = ['name', 'price', 'count'];
    sortField: string;
    isAsc = true;

    @ViewChild('selector') selector;

    constructor(private cartService: CartObservableService, private router: Router) {}

    ngOnInit(): void {
        this.items$ = this.cartService.getProducts();
        this.cartService.quantityChanged.subscribe((quantity) => (this.totalQuantity = quantity));
        this.cartService.totalChanged.subscribe((sum) => (this.totalSum = sum));
    }

    trackByItems(index: number, item: Product): number {
        return item.id;
    }

    onIncrease(item: Product, quantity: number): void {
        this.items$ = this.cartService.increaseQuantity(item, quantity);
    }

    onDecrease(item: Product, quantity: number): void {
        this.items$ = this.cartService.decreaseQuantity(item, quantity);
    }

    onDelete(cartItem: CartItem): void {
        this.items$ = this.cartService.removeProduct(cartItem.item.id);
    }

    onRemoveAll(): void {
        this.cartService.removeAllProducts();
    }

    onProcessOrder(): void {
        const link = ['/order'];
        this.router.navigate(link);
    }
}
