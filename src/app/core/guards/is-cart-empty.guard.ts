import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartObservableService } from 'src/app/cart/services/cart-observable.service';
import { CartService } from 'src/app/cart/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class IsCartEmptyGuard implements CanActivate {
  constructor(
    private cartService: CartObservableService,
    private router: Router
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CanActivate Guard is called');
      if (!this.isCartEmpty()){
      return true;
    } else {
      alert('The cart is empty');
    }
  }

  private isCartEmpty(): boolean {
    return this.cartService.isEmptyCart();
  }

}
