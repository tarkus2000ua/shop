import { Component, Input, OnInit } from '@angular/core';

import { CATEGORY_NAMES, Product } from '../../../models/Product.model';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onBuy(product: Product): void{
    console.log(`You've just added ${product.name} to the cart`);
    this.cartService.addItem(product);
  }

  getCategoryName(id: number): string {
    return CATEGORY_NAMES[id];
  }

}
