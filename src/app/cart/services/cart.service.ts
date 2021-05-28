import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { CartItem } from './../../models/CartItem.model';
import { Product } from '../../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartProducts: CartItem[] = [];
    totalQuantity: number;
    totalSum: number;
    // Думаю, то тут можно обойтись одним сабджектом,
    // так как все эти изменения происходят вместе
    cartChanged = new Subject<CartItem[]>();
    totalChanged = new Subject<number>();
    quantityChanged = new Subject<number>();

    constructor() {}

    addProduct(item: Product, quantity = 1): void {
        const products = JSON.parse(JSON.stringify(this.cartProducts));
        const index = products.findIndex((el) => el.item.id === item.id);
        if (index !== -1) {
            const itemToUpdate = products[index];
            itemToUpdate.count += quantity;
        } else {
            products.push({ item, count: quantity });
        }
        this.cartProducts = products;
        this.updateCartData();
    }

    removeProduct(index: number): void {
        const products = JSON.parse(JSON.stringify(this.cartProducts));
        if (products[index]) {
            products.splice(index, 1);
            this.cartProducts = products;
            this.updateCartData();
        }
    }

    increaseQuantity(index: number, quantity: number): void {
        this.changeQuantity(index, quantity);
    }

    decreaseQuantity(index: number, quantity: number): void {
        this.changeQuantity(index, -1 * quantity);
    }

    private changeQuantity(index: number, quantityToAdd: number): void {
        const products = JSON.parse(JSON.stringify(this.cartProducts));
        if (products[index]) {
            const itemToUpdate = products[index];
            itemToUpdate.count += quantityToAdd;
            this.cartProducts = products;
            this.updateCartData();
        }
    }

    removeAllProducts(): void {
        this.cartProducts = [];
        this.updateCartData();
    }

    getProducts(): Observable<CartItem[]> {
        return of(this.cartProducts);
    }

    updateCartData(): void {
        this.cartChanged.next(this.cartProducts);
        this.totalChanged.next(this.calcTotal());
        this.quantityChanged.next(this.cartProducts.length);
    }

    isEmptyCart(): boolean {
        return this.cartProducts.length ? true : false;
    }

    calcTotal(): number {
        return this.cartProducts.reduce((sum, el) => (sum += el.count * el.item.price), 0);
    }
}
