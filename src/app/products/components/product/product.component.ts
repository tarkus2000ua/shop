import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CATEGORY_NAMES, Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() buy = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(product: Product): void{
    console.log(`You've just added ${product.name} to the cart`);
    this.buy.emit(product.id);
  }

  getCategoryName(id: number): string {
    return CATEGORY_NAMES[id];
  }

}
