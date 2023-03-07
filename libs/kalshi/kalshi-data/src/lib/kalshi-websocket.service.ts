import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KalshiWebsocketService {
  private socket: WebSocket;

  send(message: string) {
    this.socket.send(JSON.stringify({ message: message }));
  }

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (event) => {
      console.log('Message from server', JSON.parse(event.data));
    };
    this.socket.onclose = (event) => {
      console.log('Disconnected from server', event);
    };
    this.socket.onerror = (error) => {
      console.error('Error');
    };
  }
}
