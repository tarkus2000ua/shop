import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartItem } from './../../models/CartItem.model';
import { Product } from '../../models/product.model';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private cartProducts: CartItem[] = [];
    totalQuantity: number;
    totalSum: number;
    cartChanged = new BehaviorSubject<CartItem[]>(this.cartProducts);
    totalChanged = new BehaviorSubject<number>(0);
    quantityChanged = new BehaviorSubject<number>(0);

    constructor(private storageService: LocalStorageService) {}

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

    getProducts(): void {
        this.cartChanged.next(this.cartProducts);
    }

    updateCartData(): void {
        this.cartChanged.next(this.cartProducts);
        this.totalChanged.next(this.calcTotal());
        this.quantityChanged.next(this.cartProducts.length);
        this.storageService.setValue('cart', JSON.stringify(this.cartProducts));
    }

    isEmptyCart(): boolean {
        return this.cartProducts.length ? false : true;
    }

    calcTotal(): number {
        return this.cartProducts.reduce((sum, el) => (sum += el.count * el.item.price), 0);
    }
}
