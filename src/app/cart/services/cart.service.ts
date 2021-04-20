import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '../../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Product[] = [];

  constructor() { }

  addItem(item: Product): void{
    if (!this.products){
      this.products = [];
    }
    this.products.push(item);
  }

  getItems(): Observable<Product[]>{
    return of(this.products);
  }
}
