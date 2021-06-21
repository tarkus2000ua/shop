import { ProductListComponent } from './products/components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './products/components';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';
import { ProcessOrderComponent } from './orders/components/process-order/process-order.component';
import { IsCartEmptyGuard } from './core/guards/is-cart-empty.guard';
import { AdminComponent } from './admin/admin.component';
import { ProductsListComponent } from './admin/components/products-list/products-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product-list',
    pathMatch: 'full',
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'cart',
    component: CartListComponent,
  },
  {
    path: 'order',
    component: ProcessOrderComponent,
    canActivate: [IsCartEmptyGuard],
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  }
  // {
  //   // The router will match this route if the URL requested
  //   // doesn't match any paths for routes defined in our configuration
  //   path: '**',
  //   component: PathNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
