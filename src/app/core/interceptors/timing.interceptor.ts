import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  requestsInfo: { url: string; time: number }[];
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = new Date().getTime();
    return next.handle(req).pipe(
        tap((res: HttpResponse<any>) => {
            if (res.type === HttpEventType.Response && res.url.includes('cart')){
               const end = new Date().getTime();
               console.log(`Request to ${res.url} took ${end - start} ms`);
            }
        })
    );
}

}
