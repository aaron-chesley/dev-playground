import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class KalshiWebsocketService {
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

  constructor(private store: Store) {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.store.dispatch({
        type: message.messageType,
        payload: message.payload,
      });
    };
    this.socket.onclose = (event) => {
      console.log('Disconnected from server', event);
    };
    this.socket.onerror = (error) => {
      console.error('Error');
    };
  }
}
