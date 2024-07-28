import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class CardlyWebsocketService {
  private socket: Socket;
  private readonly url = '/';

  private connect() {
    this.socket.connect();
  }

  private disconnect() {
    this.socket.disconnect();
  }

  public sendMessage(messageName: string, payload: any): Observable<any> {
    return new Observable((observer) => {
      this.socket.emit(messageName, payload);
      observer.next();
      observer.complete();
    });
  }

  public receiveMessage(messageType: string): Observable<any> {
    return fromEvent(this.socket, messageType);
  }

  constructor() {
    this.socket = io(this.url, { withCredentials: true });
    this.connect();
  }
}
