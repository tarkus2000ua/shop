import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CartObservableService } from 'src/app/cart/services/cart-observable.service';

@Injectable({
  providedIn: 'root'
})
export class IsCartEmptyGuard implements CanActivate {
  constructor(
    private cartService: CartObservableService,
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('CanActivate Guard is called');
      if (!this.isCartEmpty()){
      return true;
    } else {
      alert('The cart is empty');
      return false;
    }
  }

  private isCartEmpty(): boolean {
    return this.cartService.isEmptyCart();
  }

}
