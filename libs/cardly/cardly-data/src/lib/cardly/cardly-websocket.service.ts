import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class CardlyWebsocketService {
  private socket: Socket;
  private readonly url = '/';

  public connect() {
    this.socket = io(this.url, { withCredentials: true });
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
    this.socket = null;
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

  constructor() {}
}
