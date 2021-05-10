import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {
  items$: Observable<Product []>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items$ = this.cartService.getItems();
  }

  trackByItems(index: number, item: Product): number { return item.id; }

}
