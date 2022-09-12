import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { HttpLoadingIndicatorService } from './http-loading-indicator.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.httpLoadingIndicatorService.addHttpRequest(req.url);
    return next
      .handle(req)
      .pipe(
        finalize(() =>
          this.httpLoadingIndicatorService.removeHttpRequest(req.url)
        )
      );
  }

  constructor(
    private httpLoadingIndicatorService: HttpLoadingIndicatorService
  ) {}
}
