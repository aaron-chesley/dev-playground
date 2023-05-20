import axios from 'axios';
import express from 'express';
import { KlsLoginResponse } from '@playground/kalshi-util';
import { KalshiWebsocket } from './kalshi-websocket';

export class KalshiServer {
  private readonly app = express();
  private readonly httpServer = this.app.listen(8080);
  private kalshiSocket: KalshiWebsocket;
  // private readonly KALSHI_API_ROOT = 'https://demo-api.kalshi.co/trade-api/v2';
  // private KALSHI_SOCKET_ADDRESS = 'wss://demo-api.kalshi.co/trade-api/ws/v2';
  private readonly KALSHI_API_ROOT =
    'https://trading-api.kalshi.com/trade-api/v2';
  private KALSHI_SOCKET_ADDRESS =
    'wss://trading-api.kalshi.com/trade-api/ws/v2';
  private readonly LOGIN_EMAIL = '';
  private readonly LOGIN_PASSWORD = '';
  public loginDetails: KlsLoginResponse;
  // public loginDetails: KlsLoginResponse = {
  //   member_id: '',
  //   token:
  //     '',
  // };

  constructor() {
    this.login();
  }

  private async login() {
    const res = await axios.post<KlsLoginResponse>(
      `${this.KALSHI_API_ROOT}/login`,
      {
        email: this.LOGIN_EMAIL,
        password: this.LOGIN_PASSWORD,
      }
    );
    this.loginDetails = res.data;
    this.kalshiSocket = new KalshiWebsocket(
      this.KALSHI_SOCKET_ADDRESS,
      this.loginDetails.token
    );
  }

  private close() {
    this.httpServer.close();
  }
}
