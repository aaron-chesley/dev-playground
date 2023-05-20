// import * as WebSocket from 'ws';
import { WebSocket } from 'ws';

export class KalshiWebsocket {
  private socket: WebSocket;

  private waitForOpenConnection() {
    return new Promise<void>((resolve, reject) => {
      const maxNumberOfAttempts = 20;
      const intervalTime = 1000; //ms

      let currentAttempt = 0;
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval);
          reject(new Error('Maximum number of attempts exceeded'));
        } else if (this.socket.readyState === WebSocket.OPEN) {
          clearInterval(interval);
          resolve();
        }
        currentAttempt++;
      }, intervalTime);
    });
  }

  async send(message: object) {
    const payload = JSON.stringify(message);
    if (this.socket.readyState !== WebSocket.OPEN) {
      try {
        await this.waitForOpenConnection();
        this.socket.send(payload);
      } catch (err) {
        console.error(err);
      }
    } else {
      this.socket.send(payload);
    }
  }

  constructor(socketAddress: string, apiToken: string) {
    this.socket = new WebSocket(socketAddress, {
      headers: {
        authorization: `Bearer ${apiToken}`,
      },
    });
    this.socket.onopen = () => {
      console.log('Connected to server');
      this.send({
        id: 1,
        cmd: 'subscribe',
        params: {
          channels: ['ticker'],
          market_tickers: ['INXD-23MAR21-B3975'],
        },
      });
    };
    this.socket.onmessage = (event) => {
      // const message = JSON.parse(event.data);
      console.log('event: ', event.data);
    };
    this.socket.onclose = (event) => {
      console.log('Disconnected from server', event);
    };
    this.socket.onerror = (error) => {
      console.error('Error');
    };
  }
}
