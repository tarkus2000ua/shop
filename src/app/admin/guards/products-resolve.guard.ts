import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsPromiseService } from 'src/app/products/services/products-promise.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolveGuard implements CanDeactivate<unknown> {
  constructor(
    private productsService: ProductsPromiseService,
    private router: Router
  ) {}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Product | null> {
    console.log('ProductResolve Guard is called');

    // if (!route.paramMap.has('productID')) {
    //   return of(new UserModel(null, '', ''));
    // }

    const id = +route.paramMap.get('productID');

    return this.productsService.getProduct(id).then((product) => {
      if (product) {
        return product;
      } else {
        this.router.navigate(['/products']);
        return null;
      }
    });
  }
}
