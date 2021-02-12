import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorService implements HttpInterceptor{

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('WE DID IT')
    if (this.cookieService.get('token_')) {
      let modifiedRequest = req.clone({
        // setHeaders: {Authorization: `Bearer ${this.cookieService.get('token_')}`}
        headers: req.headers.set('Authorization', 'Bearer ' + this.cookieService.get('token_'))
      })
      modifiedRequest = modifiedRequest.clone({
        headers: modifiedRequest.headers.set('Content-Type', 'application/json')
      })
      modifiedRequest = modifiedRequest.clone({
        headers: modifiedRequest.headers.set('Accept', 'application/json')
      })
      return next.handle(modifiedRequest)
    }
    return next.handle(req)
  }
}
