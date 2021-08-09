import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private route: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          'client-id': environment.client_id,
          'api-key': environment.api_key,
          'Authorization': 'Bearer ' + token
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'client-id': environment.client_id,
          'api-key': environment.api_key
        }
      });
    }

    return next.handle(request);
  }
}
