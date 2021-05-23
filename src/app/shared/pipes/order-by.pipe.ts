import { Pipe, PipeTransform } from '@angular/core';

import { CartItem } from 'src/app/models/CartItem.model';

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
    transform(products: CartItem[], key: string, isAsc: boolean = true): CartItem[] {
        if (isAsc) {
            products.sort((a, b) => (key === 'count' ? compare(a[key], b[key]) : compare(a.item[key], b.item[key])));
        } else {
            products.sort((a, b) => (key === 'count' ? compare(b[key], a[key]) : compare(b.item[key], a.item[key])));
        }
        return products;
    }
}

function compare(a: number | string, b: number | string): number {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
