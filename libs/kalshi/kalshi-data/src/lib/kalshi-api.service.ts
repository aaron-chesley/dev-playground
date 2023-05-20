import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponsePayload {
  member_id: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class KalshiApiService {
  // private readonly baseUrl = 'https://demo-api.kalshi.co/trade-api/v2/';
  private readonly baseUrl = 'http://localhost:8080/';

  login(payload: LoginRequestPayload): Observable<LoginResponsePayload> {
    return this.http.post<LoginResponsePayload>(
      `${this.baseUrl}login`,
      payload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getExchangeStatus() {
    return this.http.get(`${this.baseUrl}exchange-status`);
  }

  getPortfolioBalance() {
    return this.http.get(`${this.baseUrl}portfolio-balance`);
  }

  constructor(private http: HttpClient) {}
}
