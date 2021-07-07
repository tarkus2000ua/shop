import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import {
  catchError,
  concatMap,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { CartItem } from 'src/app/models/CartItem.model';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartObservableService {
  private cartUrl = 'http://localhost:3000/cart';
  private cartProducts: CartItem[] = [];
  totalQuantity: number;
  totalSum: number;
  cartChanged = new BehaviorSubject<CartItem[]>(this.cartProducts);
  totalChanged = new BehaviorSubject<number>(0);
  quantityChanged = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  addProduct(item: Product, quantity = 1): Observable<CartItem[]> {
    return this.updateExistingProductQuantity(item, quantity).pipe(
      catchError((err) => {
        if (err.status === 404) {
          return this.createProduct(item, quantity);
        }
      })
    );
  }

  createProduct(item: Product, quantity: number): Observable<CartItem[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<CartItem[]>(
        this.cartUrl,
        { id: item.id, item, count: quantity },
        options
      )
      .pipe(
        switchMap(() => this.getProducts()),
        catchError(this.handleError)
      );
  }

  updateExistingProductQuantity(
    item: Product,
    quantity: number
  ): Observable<CartItem[]> {
    let initialQuantity = 0;

    return this.getProduct(item.id).pipe(
      tap((product) => (initialQuantity = product.count)),
      concatMap(() =>
        this.updateProductQuantity(item, initialQuantity + quantity)
      )
    );
  }

  updateProductQuantity(
    item: Product,
    quantity: number
  ): Observable<CartItem[]> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .put<CartItem[]>(
        `${this.cartUrl}/${item.id}`,
        { id: item.id, item, count: quantity },
        options
      )
      .pipe(
        switchMap(() => this.getProducts()),
        catchError(this.handleError)
      );
  }

  getProducts(): Observable<CartItem[]> {
    return this.http
      .get<CartItem[]>(this.cartUrl)
      .pipe(
        tap(products => {
          this.cartProducts = products;
          this.calcTotal();
          this.updateCartData();
        }),
        catchError(this.handleError)
        );
  }

  getProduct(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.cartUrl}/${id}`).pipe();
  }

  removeProduct(id: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.cartUrl}/${id}`).pipe(
      switchMap(() => this.getProducts()),
      catchError(this.handleError)
    );
  }

  removeAllProducts(): void {
    this.cartProducts.forEach((product) => this.removeProduct(product.item.id));
    this.cartProducts = [];
  }

  updateCartData(): void {
    this.totalChanged.next(this.calcTotal());
    this.quantityChanged.next(this.cartProducts.length);
  }

  calcTotal(): number {
    return this.cartProducts.reduce(
      (sum, el) => (sum += el.count * el.item.price),
      0
    );
  }

  increaseQuantity(item: Product, quantity: number): Observable<CartItem[]> {
    return this.changeQuantity(item, quantity);
  }

  decreaseQuantity(item: Product, quantity: number): Observable<CartItem[]> {
    return this.changeQuantity(item, -1 * quantity);
  }

  isEmptyCart(): boolean {
    return this.cartProducts.length ? false : true;
}

  private changeQuantity(
    item: Product,
    quantityToAdd: number
  ): Observable<CartItem[]> {
    return this.addProduct(item, quantityToAdd);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${err.status}, body was: ${err.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
function switchhMap(
  arg0: () => Observable<CartItem[]>
): import('rxjs').OperatorFunction<CartItem[], CartItem[]> {
  throw new Error('Function not implemented.');
}
