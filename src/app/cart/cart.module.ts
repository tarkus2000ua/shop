import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@NgModule({
    declarations: [CartListComponent, CartItemComponent],
    imports: [SharedModule],
    exports: [CartListComponent]
})
export class CartModule {}
