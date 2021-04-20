import { Injectable } from '@angular/core';
import { Category, Product } from '../../models/Product.model';

const PRODUCTS = [
  {
    id: 1,
    name: 'IPad 8',
    description: 'The eighth-generation iPad (officially the iPad 10.2-inch, marketed as iPad) is a tablet computer developed and marketed by Apple Inc. as the successor to the 7th-generation iPad. It features the same 10.2-inch Retina display as its predecessor, with the SoC upgraded to the Apple A12 Bionic processor, making it 40% faster according to Apple.',
    price: 350,
    category: Category.Tablets,
    isAvailable: true
  },
  {
    id: 2,
    name: 'Samsung Galaxy Tab S7',
    description: 'The Samsung Galaxy Tab S7 and Galaxy Tab S7+ are Android-based tablets designed, developed, and marketed by Samsung Electronics.',
    price: 300,
    category: Category.Tablets,
    isAvailable: true
  },
  {
    id: 3,
    name: 'MacBook Air M1',
    description: 'On November 10, 2020, Apple announced an updated MacBook Air with an Apple-designed M1 processor, launched alongside an updated Mac Mini and 13-inch MacBook Pro as the first Macs with Apple\'s new line of custom ARM-based Apple silicon processors.',
    price: 1000,
    category: Category.Laptops,
    isAvailable: true
  },
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Product[]{
    return PRODUCTS;
  }
}
