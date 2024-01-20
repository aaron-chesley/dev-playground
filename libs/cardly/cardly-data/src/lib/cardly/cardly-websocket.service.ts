import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class CardlyWebsocketService {
  private socket: Socket;
  private readonly url = 'http://localhost:3000';

  private connect() {
    this.socket.connect();
  }

  private disconnect() {
    this.socket.disconnect();
  }

  public sendMessage(messageName: string, payload: any, cb?: Function) {
    this.socket.emit(messageName, payload, cb ? cb : null);
  }

  public receiveMessage(messageType: string, callback: (message: any) => void) {
    this.socket.on(messageType, (message) => {
      callback(message);
    });
  }

  constructor() {
    this.socket = io(this.url);
    this.connect();
  }
}
