import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AdminComponent } from './admin.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsResolveGuard } from './guards/products-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'products', component: ProductsListComponent },
          { path: 'product/add', component: ProductFormComponent },
          {
            path: 'product/edit/:productID',
            component: ProductFormComponent, // canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductsResolveGuard,
            },
          },
          { path: 'orders', component: OrdersListComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
  static components = [
    AdminComponent,
    ProductsListComponent,
    ProductFormComponent,
    OrdersListComponent,
  ];
}
