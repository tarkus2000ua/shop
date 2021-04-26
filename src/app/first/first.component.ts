import { Component, OnInit } from '@angular/core';

import { Category } from '../models/product.model';

const CATEGORY_NAMES = ['Desktops', 'Laptops', 'Tablets'];

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  name = 'IPad';
  description = '8th generation of Apple\'s IPad';
  price = 350;
  category = Category.Tablets;
  isAvailable = true;

  constructor() {}

  ngOnInit(): void {}

  getCategoryName(id: number): string {
    return CATEGORY_NAMES[id];
  }
}
