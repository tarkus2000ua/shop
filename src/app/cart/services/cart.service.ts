import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CartItem } from './../../models/CartItem.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems: CartItem[] = [];

  constructor() { }

  addItem(item: Product): void {
    const index = this.cartItems.findIndex(el => el.item.id === item.id);
    if (index !== -1){
      const itemToUpdate = this.cartItems[index];
      itemToUpdate.count += 1;
    } else {
      this.cartItems.push({item, count: 1});
    }
  }

  getItems(): Observable<CartItem[]>{
    return of(this.cartItems);
  }

}
