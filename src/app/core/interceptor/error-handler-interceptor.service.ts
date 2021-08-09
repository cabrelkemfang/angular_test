import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }
  /**
   * Intercepts a Http request and adds a default error handler.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Error handler.
   */
  private handleError(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const status = response.status;

    if (status === 401) {
      this.notificationService.warn(response.error);
      this.router.navigate(['/login']);
      sessionStorage.clear();
    } else if (status === 400) {
      this.notificationService.warn(response.error);
    } else if (status === 403) {
      this.notificationService.warn('You are not authorized for this request!');
    } else if (status === 404) {
      this.notificationService.warn('Resource does not exist!');
    } else if (status === 500) {
      this.notificationService.warn(
        'Internal Server Error. Please try again later'
      );
    } else {
      this.notificationService.warn(
        'Connection Error. You Are not Connected To the Internet.'
      );
    }

    throw response;
  }
}
