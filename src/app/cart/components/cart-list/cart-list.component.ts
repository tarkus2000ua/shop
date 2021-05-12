import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CartItem } from './../../../models/CartItem.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  items: CartItem [];
  totalSum: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    console.log('init');
    this.cartService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  getTotalSum(): number {
    return this.items.reduce((sum, item) => {
      return sum + item.item.price * item.count;
    }, 0);
  }

  trackByItems(index: number, item: Product): number { return item.id; }

  onCountChange(index: number, count: number): void {
    this.items[index].count = count;
  }

  onDelete(i: number): void {
    this.items.splice(i, 1);
  }

}
