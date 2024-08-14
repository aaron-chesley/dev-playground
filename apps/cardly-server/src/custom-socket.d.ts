import { CardlyUser } from '@playground/cardly-util';

declare module 'socket.io' {
  interface Socket {
    user: CardlyUser | undefined;
  }
}
