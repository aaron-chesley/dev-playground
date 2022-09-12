import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpLoadingIndicatorService {
  private httpRequestMap: Map<string, string> = new Map();
  private loadingSub = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSub.asObservable();

  addHttpRequest(url: string) {
    this.httpRequestMap.set(url, url);
    this.setLoading();
  }

  removeHttpRequest(url: string) {
    this.httpRequestMap.delete(url);
    this.setLoading();
  }

  private setLoading() {
    this.httpRequestMap.size === 0
      ? this.loadingSub.next(false)
      : this.loadingSub.next(true);
  }
}
