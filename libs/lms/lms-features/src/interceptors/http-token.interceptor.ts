import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { JwtService } from '@playground/lms-data';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headersConfig = req.clone({
      headers: req.headers.set('Accept', 'application/json'),
    });

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig = headersConfig.clone({
        headers: headersConfig.headers.set('Authorization', `jwt ${token}`),
      });
    }

    if (
      !headersConfig.headers.has('Content-Type') &&
      !(headersConfig.body instanceof FormData)
    ) {
      headersConfig = headersConfig.clone({
        headers: headersConfig.headers.set('Content-Type', 'application/json'),
      });
    }

    const request = headersConfig.clone();
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
      })
    );
  }
}
