import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/services/cart.service';


import { CATEGORY_NAMES, Product } from '../../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
    product: Product;
    @Output() buy = new EventEmitter<Product>();

    constructor(private route: ActivatedRoute, private productsService: ProductsService, private cartService: CartService) {}

    ngOnInit(): void{
        const observer = {
            next: (product: Product) => (this.product = { ...product }),
            error: (err: any) => console.log(err)
          };
        this.route.paramMap
            .pipe(
              switchMap((params: ParamMap) => this.productsService.getProduct(+params.get('id'))))
            .subscribe(observer);

    }

    onBuy(): void {
        this.cartService.addProduct({...this.product});
    }

    getCategoryName(id: number): string {
        return CATEGORY_NAMES[id];
    }
}
