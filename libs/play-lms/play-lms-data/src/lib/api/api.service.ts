import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: any): Observable<any> {
    return this.http.put(`${path}`, body).pipe(catchError(this.formatErrors));
  }

  patch(path: string, body: unknown = {}): Observable<any> {
    return this.http.patch(`${path}`, body).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${path}`, body).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${path}`).pipe(catchError(this.formatErrors));
  }

  downloadFile(path: string): Observable<Blob> {
    return this.http
      .get(`${path}`, { responseType: 'blob' })
      .pipe(catchError(this.formatErrors));
  }
}
