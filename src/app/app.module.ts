import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MenubarModule } from 'primeng/menubar';
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './core/interceptors';
import { RootStoreModule } from './core/@ngrx/root-store.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CartModule,
    ProductsModule,
    OrdersModule,
    SharedModule,
    MenubarModule,
    AppRoutingModule,
    AdminModule,
    HttpClientModule,

    RootStoreModule,

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any): string =>
      typeof value === 'function' ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
}

}
