import { ProductListComponent } from './products/components/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    // {
    //   path: 'home',
    //   component: HomeComponent
    // },
    {
      path: '',
      redirectTo: '/product-list',
      pathMatch: 'full'
    },
    {
      path: 'product-list',
      component: ProductListComponent
    },
    // {
    //   // The router will match this route if the URL requested
    //   // doesn't match any paths for routes defined in our configuration
    //   path: '**',
    //   component: PathNotFoundComponent
    // }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  