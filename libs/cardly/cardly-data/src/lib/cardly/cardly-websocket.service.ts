import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardlyPayload } from '@playground/cardly-util';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class CardlyWebsocketService {
  private socket: Socket;
  private readonly url = '/';

  public connect() {
    this.socket.connect();
    this.socket.onAny((event, msg: CardlyPayload) => {
      this.store.dispatch({ type: msg.type, data: msg });
    });
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendGameMessage(payload: any): void {
    this.socket.emit('msg', payload);
  }

  constructor(private store: Store) {
    this.socket = io(this.url, { withCredentials: true, autoConnect: false });
  }
}
