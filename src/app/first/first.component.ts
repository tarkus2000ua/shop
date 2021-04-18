import { Component, OnInit } from '@angular/core';

enum Category {
  Desctops,
  Laptops,
  Tablets,
}
const CATEGORY_NAMES = ['Desctops', 'Laptops', 'Tablets'];

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  name = 'IPad';
  description = "8th genereation of Apple's IPad";
  price = 350;
  category = Category.Tablets;
  isAvailable = true;

  constructor() {}

  ngOnInit(): void {}

  getCategoryName(id: number) {
    return CATEGORY_NAMES[id];
  }
}
